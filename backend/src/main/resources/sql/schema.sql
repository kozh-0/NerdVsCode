DROP TABLE IF EXISTS "order" CASCADE;

CREATE TABLE "order"
(
    id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL,
    car_name VARCHAR(255) NOT NULL,
    car_price NUMERIC NOT NULL,
    passport_details VARCHAR(255) NOT NULL,
    monthly_payment NUMERIC NOT NULL,
    rate NUMERIC NOT NULL,
    init_fee NUMERIC NOT NULL,
    year INTEGER NOT NULL,
    email VARCHAR(255) NOT NULL,
    telegram VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

