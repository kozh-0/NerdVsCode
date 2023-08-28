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

INSERT INTO client (id, last_name, first_name, patronymic, email, age, work_experience, inn, snils, credit_rating, debt_load, number_open_loans)
VALUES (1, 'Королёв', 'Михаил', 'Петрович', 'mikhail75@gmail.com', 8, 7, 6, 5, 4, 3, 2);