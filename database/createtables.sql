--Create user table
CREATE TABLE users(
  user_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(200) NOT NULL,
  default_shipping_address VARCHAR(100) NOT NULL,
  phone_number INT NOT NULL,
  user_role TINYINT(1) DEFAULT 0,
  register_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
-- Create product table
CREATE TABLE products(
  product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  pName VARCHAR(50),
  pDescription VARCHAR(300),
  pPrice INT,
  pSold INT DEFAULT 0,
  pDiscount INT DEFAULT 0,
  pQuantity INT DEFAULT 0,
  pRating DECIMAL(10, 2) DEFAULT '0.00',
  pImage VARCHAR(150),
  pStatus VARCHAR(20)
);
-- Create product_category table
CREATE TABLE categories(
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  cName VARCHAR(30) NOT NULL,
  cDescription VARCHAR(250),
  cImage VARCHAR(100),
  cStatus VARCHAR(20)
);
-- Create orders table
CREATE TABLE orders (
  order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  total_amount INT NOT NULL DEFAULT '0.00',
  created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT "Not processed",
  user_id INT,
  product_id VARCHAR(10),
  phone_number INT,
  address VARCHAR(150)
);
-- Create order_details table
CREATE TABLE order_details (
  item_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id VARCHAR(10) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  product_cost INT,
  quantity INT NOT NULL,
  payment_mode VARCHAR(50) NOT NULL
);
CREATE TABLE reviews(
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  user_id INT,
  review VARCHAR(200),
  rating FLOAT(8, 2)
);
-- DELETE ALL TABLES
DROP TABLE users;
DROP TABLE products;
DROP TABLE categories;
DROP TABLE orders;
DROP TABLE order_details;
