/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const superagent = require('superagent');
const pg = require('pg');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const client = new pg.Client(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3000;
client.connect();
const app = express();

app.use(cookieParser());
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


//Routes
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    let method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(getJoke);
app.get('/', (req, res) => {
  let cookie = req.cookies.userID ? req.cookies.userID : '';
  res.render('pages/index', {'cookie': cookie});
});
app.post('/search', createSearch);
app.get('/recipe/:id', getRecipe);
app.post('/recipe/:id', saveRecipe);
app.delete('/recipe/:id', deleteRecipe);
app.get('/random', randomRecipe);
app.get('/saved', getSaved);
app.get('/about', (req, res) => {
  let cookie = req.cookies.userID ? req.cookies.userID : '';
  res.render('pages/about', {'cookie': cookie});
});
app.get('/login', (req, res) => {
  let cookie = req.cookies.userID ? req.cookies.userID : '';
  res.render('pages/login', {'message': '', 'cookie': cookie});
});
app.post('/login', authenticate);
app.get('/signup', (req, res) =>{
  let cookie = req.cookies.userID ? req.cookies.userID : '';
  res.render('pages/signup', {'message': '', 'cookie': cookie});
});
app.post('/signup', register);
app.get('/logout', (req, res) => {
  res.clearCookie('userID');
  res.render('pages/login', {'message': 'You have been signed out', 'cookie': ''});
});

function User(username) {
  this.username = username;
}

function Result(result) {
  this.recipe_id = result.id;
  this.image_url = `https://spoonacular.com/recipeImages/${result.id}-312x231.jpg`;
  this.name = result.title;
  this.time = result.readyInMinutes;
  this.servings = result.servings;
}

function Recipe(data, id) {
  this.recipe_id = id;
  this.name = data.title;
  this.image = data.image;
  this.time = data.readyInMinutes;
  this.servings = data.servings;
  this.rating = data.spoonacularScore;
  this.source = data.sourceUrl;
  this.ingredients = data.extendedIngredients;
  this.steps = data.analyzedInstructions[0] ? data.analyzedInstructions[0].steps : [{'number': 0, 'step': 'Instructions Unavailable'}];
  // this.timeStamp = timeStamp();

}

//Functions
function getJoke(req, res, next) {
  let url = `https://api.spoonacular.com/food/jokes/random?apiKey=${process.env.API_KEY}`;

  superagent.get(url)
    .then( response => {
      res.locals.joke = response.body.text;
      next();
    })
    .catch(next);
}

function handleError(error, response) {
  response.status(error.status || 500).send(error.message);
}

function createSearch(req, res) {
  let url = `https://api.spoonacular.com/recipes/search?apiKey=${process.env.API_KEY}&query=${req.body.search}`;

  superagent.get(url)
    .then(searchResults => searchResults.body.results.map(result => new Result(result)))
    .then(results => {
      let cookie = req.cookies.userID ? req.cookies.userID : '';
      return res.render('pages/search', {searchResults: results, 'cookie': cookie});
    })
    .catch(error => handleError(error, res));
}

function getRecipe(req, res) {
  let url = `https://api.spoonacular.com/recipes/informationBulk?ids=${req.params.id}&apiKey=${process.env.API_KEY}`;
  let userID = req.cookies.userID ? parseInt(req.cookies.userID) : -1;
  let SQL = `SELECT COUNT(recipe_id) FROM recipes WHERE user_id = ${userID} AND recipe_id = ${req.params.id};`;
  let recipeSaved = 0;

  client.query(SQL)
    .then(result => {
      recipeSaved = parseInt(result.rows[0].count);
    })
    .then(
      superagent.get(url)
        .then(recipe => {
          return new Recipe(recipe.body[0], req.params.id);
        })
        .then(result => {
          if (recipeSaved > 0) {
            let cookie = req.cookies.userID ? req.cookies.userID : '';
            res.render('pages/recipe_details', {details: result, 'cookie': cookie, saved: true});
          }
          else {
            let cookie = req.cookies.userID ? req.cookies.userID : '';
            res.render('pages/recipe_details', {details: result, 'cookie': cookie, saved: false});
          }
        })
    )
    .catch(error => handleError(error, res));
}

function saveRecipe(req, res) {
  let {name, image_url, time, servings} = req.body;
  let userID = parseInt(req.cookies.userID);

  let SQL = 'INSERT INTO recipes(recipe_id, image, name, time, servings, user_id, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7);';
  let values = [req.params.id, image_url, name, time, servings, userID, Date.now()];

  if(isNaN(userID)) {
    res.render('pages/login', {'message': 'You must be signed in to save books', 'cookie': ''})
  }
  else {
    client.query(SQL, values)
      .then(() => {
        res.redirect(`/saved`);
      })
      .catch(error => handleError(error, res));
  }
}

function deleteRecipe(req, res) {
  let userID = parseInt(req.cookies.userID);
  let SQL = `DELETE FROM recipes WHERE user_id = ${userID} AND recipe_id = ${req.params.id};`;

  client.query(SQL)
    .then(result => res.redirect('/saved'))
    .catch(error => handleError(error, res));
}

function getSaved(req, res) {
  let userID = parseInt(req.cookies.userID);
  let cookie = req.cookies.userID ? req.cookies.userID : '';

  if (!userID) {
    res.render('pages/login', {'message': 'Sign In to Save Recipes', 'cookie': cookie, 'savedResults': ''});
  }
  else {
    let SQL = `SELECT recipe_id, image, name, time, servings FROM recipes WHERE user_id = ${userID} ORDER BY timestamp;`;
    client.query(SQL)
      .then(results => {
        if (results.rows[0]) {
          res.render('pages/saved', {'savedResults': results.rows, 'cookie': cookie});
        }
        else {
          res.render('pages/saved', {'savedResults': '', 'cookie': cookie});
        }
      });
  }
}

function randomRecipe(req, res) {
  let url = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}`;

  superagent.get(url).then(recipe => {
    let randomRecipe = new Recipe(recipe.body.recipes[0], recipe.body.recipes[0].id);
    let cookie = req.cookies.userID ? req.cookies.userID : '';
    res.redirect(`/recipe/${recipe.body.recipes[0].id}`);
  }).catch(error => handleError(error));
}

//Functions handling user login/registration
function authenticate(req, res) {
  if(!req.body.username){
    let cookie = req.cookies.userID ? req.cookies.userID : '';
    res.render('pages/login', {message: 'Please enter both id and password', 'cookie': cookie});
  } else {
    const SQL = `SELECT username, id FROM users WHERE username = '${req.body.username}';`;
    client.query(SQL)
      .then(userData => {
        if(userData.rows[0] && userData.rows[0].username === req.body.username){
          res.cookie('userID', userData.rows[0].id).redirect('/saved');
        }
        else {
          //User does not exist
          let cookie = req.cookies.userID ? req.cookies.userID : '';
          res.render('pages/login', {message: 'Invalid username!', 'cookie': cookie});
        }
      });
  }
}

function register(req, res) {
  if(!req.body.username){
    res.status('400');
    res.send('Invalid details!');
  } else {
    const SELECT = `SELECT COUNT(username) FROM users WHERE username = '${req.body.username}';`;
    const INSERT = 'INSERT INTO users (username) VALUES ($1) ON CONFLICT DO NOTHING RETURNING id;';
    client.query(SELECT)
      .then(result => {
        if (result.rows[0].count > 0) {
          let cookie = req.cookies.userID ? req.cookies.userID : '';
          res.render('pages/signup-error', {message: 'Username Already Taken', 'cookie': cookie});
        }
        else {
          let newUser = new User(req.body.username);
          let VALUES = [newUser.username];
          client.query(INSERT, VALUES)
            .then(() => {
              res.redirect('/login');
            });
        }
      });
  }
}



app.listen(PORT, () => console.log(`I know that you came to party baby, baby, baby, baby on port: ${PORT}`));
