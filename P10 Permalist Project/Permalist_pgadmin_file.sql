DROP TABLE IF EXISTS items;

CREATE TABLE items(
	id SERIAL PRIMARY KEY,
	title VARCHAR(100)
);

INSERT INTO items (title) VALUES ('Finish Homework');

SELECT * FROM items;