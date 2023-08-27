DROP TABLE IF EXISTS "client" CASCADE;

CREATE TABLE client
(
    id SERIAL NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    patronymic VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    work_experience INTEGER NOT NULL,
    inn INTEGER NOT NULL,
    snils INTEGER NOT NULL,
    credit_rating INTEGER NOT NULL,
    debt_load INTEGER NOT NULL,
    number_open_loans INTEGER NOT NULL,
    PRIMARY KEY (id)
);