DROP TABLE IF EXISTS users, recipes;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30),
  password VARCHAR(20)
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  recipe_id INT,
  timestamp INT,
  user_id INT NOT NULL REFERENCES users(id)
);



