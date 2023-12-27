CREATE DATABASE shoes_store;
USE shoes_store;

CREATE TABLE categories (
    category_id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(255) NOT NULL
);
CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    product_avatar VARCHAR(255) NOT NULL,
    price DOUBLE NOT NULL,
    `description` TEXT,
    stock INT,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);
CREATE TABLE roles (
	role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(255) NOT NULL
);

CREATE TABLE accounts (
	account_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL
);

CREATE TABLE account_role (
	account_id INT,
	role_id INT,
   FOREIGN KEY (account_id) REFERENCES accounts(account_id),
   FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    gender BIT(1),
    birthday DATE,
    phone VARCHAR(10),
    address VARCHAR(255),
    account_id INT,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);

CREATE TABLE colors (
    color_id INT PRIMARY KEY AUTO_INCREMENT,
    color_name VARCHAR(50) NOT NULL
);

CREATE TABLE sizes (
    size_id INT PRIMARY KEY AUTO_INCREMENT,
    size_name VARCHAR(50) NOT NULL
);

CREATE TABLE product_variants (
    variant_id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT,
    color_id INT,
    size_id INT,
    stock INT,
    variant_price DOUBLE,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (color_id) REFERENCES colors(color_id),
    FOREIGN KEY (size_id) REFERENCES sizes(size_id)
);

CREATE TABLE albums_variants(
	albums_variants_id INT PRIMARY KEY AUTO_INCREMENT,
    variant_id INT,
    image VARCHAR(255),
    FOREIGN KEY (variant_id) REFERENCES product_variants(variant_id)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT,
    order_date DATE NOT NULL,
    total DOUBLE NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
CREATE TABLE order_details (
    order_id INT,
    variant_id INT,
    quantity INT NOT NULL,
    price DOUBLE NOT NULL,
    PRIMARY KEY (order_id, variant_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (variant_id) REFERENCES product_variants(variant_id)
);
