CREATE TABLE tasks(
	id SERIAL PRIMARY KEY,
	tasks VARCHAR (1000) NOT NULL,
	completed VARCHAR (100) NOT NULL
);

INSERT INTO tasks
VALUES
(1,	'Eat all the food',	'incomplete');
