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

//Routes
app.get('/', (req, res) => {
  res.render('pages/index');
});
app.post('/search', createSearch);
app.get('/recipe', getRecipe);
app.post('/recipe/:id', saveRecipe);
app.get('/saved', getSaved);

function User(username) {
  this.username = username
}

function Result(data) {
  this.recipe_id = data.id;
  this.image_url = data.imageURLs[0];
  this.name = data.title;
  this.time = data.readyInMinutes;
  this.servings = data.servings;
}

function Recipe(data, id) {
  this.recipe_id = id;
  this.ingedients = data.extendedIngredients;
  this.steps = data.analyzedInstructions.steps;
}


//Functions


function createSearch(req, res) {
  let url = `https://api.spoonacular.com/recipes/search?apiKey=${process.env.API_KEY}&query=${req.query.data}`;


}

function getRecipe(req, res) {
  let url = `https://api.spoonacular.com/recipes/informationBulk?ids=${req.query.data}&apiKey=${process.env.API_KEY}`;

}

function saveRecipe(req, res) {

  
}

function getSaved(req, res) {
  let SQL = 'SELECT recipe_id FROM recipes ORDER BY timestamp;';
  let recipeIds = client.query(SQL);

  let url = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds}&apiKey=${process.env.API_KEY}`;
}

