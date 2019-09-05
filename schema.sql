DROP TABLE IF EXISTS users, recipes;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30)
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  recipe_id INT,
  image VARCHAR(255),
  name VARCHAR(255),
  time INT,
  servings INT,
  timestamp BIGINT,
  user_id INT NOT NULL REFERENCES users(id)
);



