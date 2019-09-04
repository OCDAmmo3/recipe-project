/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const superagent = require('superagent');
const session = require('express-session')
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3000;
client.connect();
const app = express();

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(session({secret: 'David smirks to himself'}));


//Routes
app.get('/', (req, res) => {
  res.render('pages/index');
});
app.post('/search', createSearch);
app.get('/recipe/:id', getRecipe);
app.post('/recipe/:id', saveRecipe);
app.get('/saved', checkSignIn, getSaved);
app.get('/about', (req, res) => {
  res.render('pages/about');
});
app.get('/login', (req, res) => {
  res.render('pages/login');
});
app.post('login', authenticate);
app.get('/signup', (req, res) =>{
  res.render('pages/signup', {'message': ''});
});
app.post('/signup', register);

function User(username, password) {
  this.username = username;
  this.password = password;
}

User.prototype.save = function() {
  const SQL = `INSERT INTO users (username, password) VALUES($1, $2) ON CONFLICT DO NOTHING RETURNING id;`;
  const VALUES = [this.username, this.password];


  return client.query(SQL, VALUES)
    .then(result => {
      this.id = result.rows[0].id;
      return this;
    });
};

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
function handleError(error, response) {
  response.status(error.status || 500).send(error.message);
}

Recipe.prototype.timeStamp = function() {
  return new Date(timeInMilliseconds).toString().slice(0, 15);
};

function createSearch(req, res) {
  let url = `https://api.spoonacular.com/recipes/search?apiKey=${process.env.API_KEY}&query=${req.body.search}`;

  superagent.get(url)
    .then(searchResults => searchResults.body.results.map(result => new Result(result)))
    .then(results => {
      return res.render('pages/search', {searchResults: results});
    })
    .catch(error => handleError(error, res));
}

function getRecipe(req, res) {
  let url = `https://api.spoonacular.com/recipes/informationBulk?ids=${req.params.id}&apiKey=${process.env.API_KEY}`;

  superagent.get(url)
    .then(recipe => {
      console.log(recipe.body[0].analyzedInstructions);
      return new Recipe(recipe.body[0], req.params.id)
    })
    .then(result => {
      res.render('pages/recipe_details', {details: result});
    })
    .catch(error => handleError(error, res));

}

function saveRecipe(req, res) {
  let {recipe_id, timestamp} = req.body;
  let SQL = 'INSERT INTO recipes(recipe_id, timestamp, username) VALUES ($1, $2, $3) RETURNING id;';
  let values = [recipe_id, timestamp, username];

  client.query(SQL, values)
    .then(result => res.redirect(`/pages/search/${result.rows[0].id}`))
    .catch(error => handleError(error, res));

}

function getSaved(req, res) {
  let SQL = 'SELECT recipe_id FROM recipes ORDER BY timestamp;';
  let recipeIds = client.query(SQL);
  let url = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds}&apiKey=${process.env.API_KEY}`;

  res.render('pages/saved');
}

//Functions handling user login/registration
function checkSignIn(req, res){
  if(req.session.user){
    next();     //If session exists, proceed to page
  } else {
    var err = new Error("Not logged in!");
    console.log(req.session.user);
    next(err);  //Error, trying to access unauthorized page!
  }
}

function authenticate(req, res) {

}

function register(req, res) {
  if(!req.body.username || !req.body.password){
    res.status('400');
    res.send('Invalid details!');
  } else {
    console.log(req.body.username);
    const SELECT = `SELECT COUNT(username) FROM users WHERE username = '${req.body.username}';`;
    const INSERT = 'INSERT INTO users (username, password) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING id;';
    console.log('Here 1');
    client.query(SELECT)
      .then(result => {
        console.log(`Result: ${result}`);
        if (result.rows[0].count > 0) {
          console.log('Already Created');
          res.render('pages/signup-error', {message: 'User Already Exists! Login or register with a different username.'});
        }
        else {
          console.log('Creating');
          let newUser = new User(req.body.username, req.body.passsword);
          let VALUES = [newUser.username, newUser.passsword];
          client.query(INSERT, VALUES)
            .then(() =>{
              req.session.user = newUser;
              res.redirect('/saved');
            });
        }
      });
  }
}


app.listen(PORT, () => console.log(`I know that you came to party baby, baby, baby, baby on port: ${PORT}`));