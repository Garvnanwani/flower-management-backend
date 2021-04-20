CREATE TABLE users(
  user_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL ,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(20) NOT NULL,
  default_shipping_address VARCHAR(100),
  dept VARCHAR(100),
  user_role TINYINT(1) DEFAULT 0,
  register_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(user_id)
);
CREATE TABLE products(
  product_id INT NOT NULL AUTO_INCREMENT,
  pname VARCHAR(50),
  pdescription VARCHAR(300),
  pprice INT,
  psold INT DEFAULT 0,
  pdiscount INT DEFAULT 0,
  pquantity INT DEFAULT 0,
  pcategory VARCHAR(50),
  prating DECIMAL(10, 2) DEFAULT '0.00',
  pimage VARCHAR(150),
  PRIMARY KEY(product_id)
);
CREATE TABLE orders (
  order_id INT NOT NULL AUTO_INCREMENT,
  total_amount INT NOT NULL DEFAULT '0.00',
  created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT "Not processed",
  user_id INT,
  product_id INT,
  phone_number INT,
  PRIMARY KEY (order_id)
);
CREATE TABLE order_details (
  item_id INT NOT NULL AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  quantity INT NOT NULL,
  unit_cost INT NOT NULL,
  payment_mode VARCHAR(50) NOT NULL,
  PRIMARY KEY (item_id)
);
CREATE TABLE categories (
  category_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100),
  description VARCHAR(1000),
  category_image VARCHAR(100),
  PRIMARY KEY (category_id)
);
CREATE TABLE choices (
choices_id INT NOT NULL AUTO_INCREMENT,
types VARCHAR(100),
materials VARCHAR(100),
colours VARCHAR(100),
PRIMARY KEY (choices_id)
);
CREATE TABLE has_production_cart(
cart_id INT NOT NULL AUTO_INCREMENT,
user_id INT NOT NULL,
order_id INT NOT NULL,
product_id INT NOT NULL,
PRIMARY KEY (cart_id)
);
insert into categories( category_id, name, description, category_image)
values 
("CB","Bouquets","the bouquet creates a wonderful expression of gratitude and affection,perfect combo of beauty and bounty,serene to the eyes and warm to the heart"),
("CFB","Flower Baskets","a dramatic display of lush and lavish blooms,mainly for wedding and for formal parties,extend warm wishes and regards"),
("CV","Vases","will brighten up and give life to the room and give aesthatic vibe to ones place,perfect gift for house warming parties"),
("CSOF","Special Occasion Flowers","Flowers designed with your thoughts in mind,numerous kinds of flowers that exist in different colors having its own meaning and representation for different type of moments like weddings, wedding anniversaries, birthday parties, valentine day and so on."),
("CAF","Artificial Flowers","transforms any settings in room,as beautiful and attractive flowers as a real flower arrangements in the decoration,are imitations of natural flowering plants used for commercial or residential decoration,if properly taken care of, it lasts for many years.");
insert into choices(materials)
values("real"),
("scented"),
("non-scented"),
("handmade"),
("fabric"),
("plastic"),
("glass");
insert into choices (colours)
 values("red"),
 ("blue"),
 ("lavender"),
 ("pink"),
 ("orange"),
 ("yellow");
 insert into choices(types)
 values("Roses"),
 ("Tulips"),
 ("Poppies"),
 ("Daisies"),
 ("Lilies");
 
