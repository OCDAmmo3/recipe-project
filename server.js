/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const superagent = require('superagent');
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
const PORT = process.env.PORT || 3000;
client.connect();
const app = express();

app.use(cors());
app.set('view engine', 'ejs');

// Application Middleware
app.use(express.urlencoded({extended:true,}));
app.use(express.static('public'));


//Routes
app.get('/', (req, res) => {
  res.render('pages/index');
});
app.post('/search', createSearch);
app.get('/recipe/:id', getRecipe);
app.post('/recipe/:id', saveRecipe);
app.get('/saved', getSaved);

function User(username) {
  this.username = username;
}

User.prototype.save = function() {
  const SQL = `INSERT INTO users (username) VALUES($1) ON CONFLICT DO NOTHING RETURNING id;`;
  const VALUES = [this.username];

  return client.query(SQL, VALUES)
    .then(result => {
      this.id = result.rows[0].id;
      return this;
    });
};

function Result(result) {
  this.recipe_id = result.id;
  this.image_url = `https://spoonacular.com/recipeImages/${result.image}`;
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
  this.ingedients = data.extendedIngredients;
  this.steps = data.analyzedInstructions.steps;
}

//Functions
function handleError(error, response) {
  response.status(error.status || 500).send(error.message);
}

// Recipe.prototype.timeStamp {
  
// }

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
    .then(recipe => new Recipe(recipe.body, req.params.id))
    .then(result => {
      res.render('pages/recipe_details', {details: result});
    })
    .catch(error => handleError(error, res));

}

function saveRecipe(req, res) {
  let {recipe_id, timestamp} = req.body;
  let SQL = 'INSERT INTO recipes(recipe_id, timestamp) VALUES ($1, $2) RETURNING id;';
  let values = [recipe_id, timestamp];

  client.query(SQL, values)
    .then(result => res.redirect(`/pages/search/${result.rows[0].id}`))
    .catch(error => handleError(error, res));

}

function getSaved(req, res) {
  let SQL = 'SELECT recipe_id FROM recipes ORDER BY timestamp;';
  let recipeIds = client.query(SQL);

  let url = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds}&apiKey=${process.env.API_KEY}`;
}

app.listen(PORT, () => console.log(`I know that you came to party baby, baby, baby, baby on port: ${PORT}`));