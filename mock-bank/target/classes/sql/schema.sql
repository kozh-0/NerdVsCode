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

INSERT INTO client (id, last_name, first_name, patronymic, passport_details, email, age, work_experience, loan_security, debt_load, number_open_loans)
VALUES (1, 'Головинская', 'Наталья', 'Павловна', '895468 1287', 'golovinskaya9@gmail.com', 21, 0, 'без обеспечения', 0.82, 6);

INSERT INTO client (id, last_name, first_name, patronymic, passport_details, email, age, work_experience, loan_security, debt_load, number_open_loans)
VALUES (2, 'Смирнов', 'Николай', 'Александрович', '759842 3564', 'smirnov4@gmail.com', 30, 1, 'автомобиль', 0.42, 3);

INSERT INTO client (id, last_name, first_name, patronymic, passport_details, email, age, work_experience, loan_security, debt_load, number_open_loans)
VALUES (3, 'Королёв', 'Михаил', 'Петрович', '564521 9847', 'mikhail75@gmail.com', 50, 15, 'квартира', 0.56, 4);

