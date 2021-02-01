DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS product_order;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS product_category;
DROP TABLE IF EXISTS product_type;
DROP TABLE IF EXISTS restaurant_order;
DROP TABLE IF EXISTS order_status;

CREATE TABLE IF NOT EXISTS product_category(
   id INTEGER PRIMARY KEY,
   name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS product_type(
   id INTEGER PRIMARY KEY,
   name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS product(
   id SERIAL PRIMARY KEY,
   product_name VARCHAR(100) UNIQUE NOT NULL,
   product_type INTEGER NOT NULL,
   product_category INTEGER NOT NULL,
   product_image VARCHAR(250),
   FOREIGN KEY (product_category) REFERENCES product_category(id),
   FOREIGN KEY (product_type) REFERENCES product_type(id)
);

CREATE TABLE IF NOT EXISTS inventory(
   id SERIAL PRIMARY KEY,
   stock INTEGER NOT NULL,
   inventory_adquisition_date TIMESTAMP NOT NULL,
   inventory_expiry_date TIMESTAMP NOT NULL,
   FOREIGN KEY (id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS order_status(
   id INTEGER PRIMARY KEY,
   name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS restaurant_order(
   id SERIAL PRIMARY KEY,
   order_state INTEGER NOT NULL,
   entry_hour TIMESTAMP NOT NULL,
   starting_hour TIMESTAMP,
   ending_hour TIMESTAMP,
   delivery_hour TIMESTAMP,
   in_charge INTEGER,
   duration INTEGER,
   FOREIGN KEY (order_state) REFERENCES order_status(id)
);

CREATE TABLE IF NOT EXISTS product_order(
   order_id INTEGER NOT NULL,
   product_id INTEGER NOT NULL,
   quantity INTEGER NOT NULL,
   PRIMARY KEY(order_id, product_id),
   FOREIGN KEY (order_id) REFERENCES restaurant_order(id),
   FOREIGN KEY (product_id) REFERENCES product(id)
);