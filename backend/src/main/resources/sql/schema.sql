DROP TABLE IF EXISTS "user" CASCADE;

CREATE TABLE "user"
(
    id SERIAL NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    patronymic VARCHAR(255),
    passport_details VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telegram VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT passport_details_unique UNIQUE (passport_details)
);

INSERT INTO "user" (id, last_name, first_name, patronymic, passport_details, email, telegram)
VALUES (1, 'Королёв', 'Михаил', 'Петрович', '564521 9847', 'mikhail75@gmail.com', 'some telegram...');