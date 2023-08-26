DROP TABLE IF EXISTS "user" CASCADE;

CREATE TABLE "user"
(
    id SERIAL NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    patronymic VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT username_unique UNIQUE (username)
);