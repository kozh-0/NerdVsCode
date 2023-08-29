DROP TABLE IF EXISTS "client" CASCADE;

CREATE TABLE client
(
    id SERIAL NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    patronymic VARCHAR(255),
    passport_details VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL,
    work_experience NUMERIC NOT NULL,
    loan_security VARCHAR(255) NOT NULL,
    debt_load NUMERIC NOT NULL,
    number_open_loans INTEGER NOT NULL,
    PRIMARY KEY (id)
);
