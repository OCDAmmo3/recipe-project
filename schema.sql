DROP TABLE IF EXISTS users, recipes;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30)
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  recipe_id INT,
  timestamp INT,
  user_id INT FOREIGN KEY REFERENCES users(id)
);


