--Create user table
CREATE TABLE users(
  user_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(200) NOT NULL,
  default_shipping_address VARCHAR(100) NOT NULL,
  phone_number INT NOT NULL,
  user_role TINYINT(1) DEFAULT 0,
  register_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(user_id),
  UNIQUE KEY idx_user_email (email),
);
-- Create product table
CREATE TABLE products(
  product_id VARCHAR(10) NOT NULL,
  pname VARCHAR(50),
  pdescription VARCHAR(300),
  pprice INT,
  psold INT DEFAULT 0,
  pdiscount INT DEFAULT 0,
  pquantity INT DEFAULT 0,
  prating DECIMAL(10, 2) DEFAULT '0.00',
  pimage VARCHAR(150),
  PRIMARY KEY(product_id),
  FULLTEXT KEY idx_ft_product_pname_pdescription (pname, pdescription)
);
-- Create product_category table
CREATE TABLE product_category(
  product_id VARCHAR(10) NOT NULL,
  category_id VARCHAR(10) NOT NULL,
  PRIMARY KEY (product_id, category_id)
);
-- Create orders table
CREATE TABLE orders (
  order_id INT NOT NULL AUTO_INCREMENT,
  total_amount INT NOT NULL DEFAULT '0.00',
  created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT "Not processed",
  user_id INT,
  product_id VARCHAR(10),
  phone_number INT,
  PRIMARY KEY (order_id),
  KEY idx_orders_user_id (user_id),
);
-- Create order_details table
CREATE TABLE order_details (
  item_id INT NOT NULL AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id VARCHAR(10) NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  product_cost INT,
  quantity INT NOT NULL,
  unit_cost INT NOT NULL,
  payment_mode VARCHAR(50) NOT NULL,
  PRIMARY KEY (item_id),
  KEY idx_order_detail_order_id (order_id)
);
-- Create categories table
CREATE TABLE categories (
  category_id VARCHAR(10) NOT NULL,
  name VARCHAR(100),
  description VARCHAR(1000),
  category_image VARCHAR(100),
  PRIMARY KEY (category_id)
);
-- Create choices table (stores choices such as Types, Materials and Color)
CREATE TABLE choices (
  choices_id INT,
  name VARCHAR(100),
  PRIMARY KEY (choices_id)
);
-- Create choices_value table (stores values such as Yellow or Roses)
CREATE TABLE choices_value(
  choices_value_id INT AUTO_INCREMENT,
  choices_id INT,
  value VARCHAR(100),
  PRIMARY KEY (choices_value_id),
  KEY idx_choices_value_choices_id (choices_id)
);
-- Create product_choices table (associates choices values to products)
CREATE TABLE product_choices (
  product_id VARCHAR(10) NOT NULL,
  choices_value_id INT NOT NULL,
  PRIMARY KEY (product_id, choices_value_id)
);
-- Create has_production_cart table
CREATE TABLE has_production_cart(
  cart_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  order_id INT NOT NULL,
  product_id VARCHAR(10) NOT NULL,
  PRIMARY KEY (cart_id),
  KEY idx_has_production_cart_id (cart_id)
);
-- Populate category table
INSERT INTO
  categories(category_id, name, description, category_image)
VALUES
  (
    "CB",
    "Bouquets",
    "the bouquet creates a wonderful expression of gratitude and affection,perfect combination of beauty and bounty,serene to the eyes and warm to the heart",
    ""
  ),
  (
    "CFB",
    "Flower Baskets",
    "a dramatic display of lush and lavish blooms,mainly for wedding and for formal parties,extend warm wishes and regards",
    ""
  ),
  (
    "CV",
    "Vases",
    "will brighten up and give life to the room and give aesthatic vibe to ones place,perfect gift for house warming parties",
    ""
  ),
  (
    "CSOF",
    "Special Occasion Flowers",
    "Flowers designed with your thoughts in mind,numerous kinds of flowers that exist in different colors having its own meaning and representation for different type of moments like weddings, wedding anniversaries, birthday parties, valentine day and so on.",
    ""
  ),
  (
    "CAF",
    "Artificial Flowers",
    "transforms any settings in room,as beautiful and attractive flowers as a real flower arrangements in the decoration,are imitations of natural flowering plants used for commercial or residential decoration,if properly taken care of, it lasts for many years.",
    ""
  );
-- Populate product table
INSERT INTO
  products(
    product_id,
    pname,
    pdescription,
    pprice,,
    psold,
    pdiscount,
    pquantity,
    prating,
    pimage
  )
VALUES
  (
    "P1",
    "Bouquet fresh flowers in cellaphane wrapping",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ),
  (
    "P2",
    "Fresh flower glass vase arrangements",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ),
  (
    "P3",
    "Bunch of handmade flowers with motisticks with some fillers",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ),
  (
    "P4",
    "Floral fantasy fresh flowers indoorplant mix flowers bouquet",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ),
  (
    "P5",
    "Fresh flowers mix basket arrangement",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ),
  (
    "P6",
    "Artificial floating flowers for decoration",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ),
  (
    "P7",
    "Bunches fake flowers",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ),
  (
    "P8",
    "Artificial flower garlands",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ),
  (
    "P9",
    "Artificial flower for home decoration and craft",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ),
  (
    "P10",
    "Bunch flower for vase pot home decoration",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ),
  (
    "P11",
    "Artificial flower with wood pot",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ),
  (
    "P12",
    "Dry wreath collections with flowers and pompous grass",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ),
  (
    "P13",
    "Handmade Flowers on cards",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  );
-- Populate product_category table
INSERT INTO
  product_category(product_id, category_id)
VALUES
  ("P1", "CB"),
  ("P1", "CSOF"),
  ("P2", "CV"),
  ("P2", "CSOF"),
  ("P3", "CB"),
  ("P3", "CAF"),
  ("P4", "CB"),
  ("P4", "CSOF"),
  ("P5", "CFB"),
  ("P5", "CSOF"),
  ("P6", "CSOF"),
  ("P6", "CAF"),
  ("P7", "CB"),
  ("P7", "CSOF"),
  ("P7", "CAF"),
  ("P8", "CSOF"),
  ("P8", "CAF"),
  ("P9", "CAF"),("P9", "CV"),
  ("P10", "CV"),
  ("P10", "CAF"),
  ("P11", "CAF"),
  ("P11", "CV"),
  ("P12", "CSOF"),
  ("P13", "CSOF");
-- Populate choices table
INSERT INTO
  choices(choices_id, name)
VALUES
  (1, 'materials'),
  (2, 'types'),
  (3, 'colours');
-- Populate choices_value table
INSERT INTO
  choices_value (choices_value_id, choices_id, value)
VALUES
  (1, 1, 'Real'),
  (2, 1, 'Scented'),
  (3, 1, 'Non-Scented'),
  (4, 1, 'Handmade'),
  (5, 1, 'Fabric'),(6, 1, 'Plastic'),(7, 1, 'Glass'),
  (8, 2, 'roses'),
  (9, 2, 'tulips'),
  (10, 2, 'poppies'),
  (11, 2, 'daisies'),(12, 2, 'lilies'),
  (13, 3, 'Red'),
  (14, 3, 'Blue'),(15, 3, 'Lavender'),
  (16, 3, 'Pink'),(17, 3, 'Orange'),(18, 3, 'Yellow');
-- Populate product_choices table
INSERT INTO
  product_choices (product_id, choices_value_id)
SELECT
  p.product_id,
  cvi.choices_value_id
FROM
  product p,
  choices_value cvi
