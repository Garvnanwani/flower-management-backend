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
    "Gift these beautiful bouquet to all your near and dear ones and make their day special. This beautiful bouquet is full of fresh roses .The elegant wrapping of cellophane and a ribbon around is worth all the hype! Flower delivery online has become the easiest today. Visit BloomsBay and order the most beautiful flowers within a single click. Carry out this best flower delivery offered to you throughout the corners of India and let this beautiful red bouquet speak its own language of charm and love. Whenever you want to express your feelings towards someone, sending flowers would be the best way to do it. Flowers convey unsaid words. At times, only words are not sufficient or something you don’t find words to convey what you want. Flower contains the magical powers that helps to express your intrinsic feeling in the very subtle manner. Express your feeling with BLOOMSBAY large range of Floral Arrangements / Floral Gifts which will surely bring a smile on your loved once. Be it any occasion Birthday, anniversary, marriage, valentine's day, mother’s day, miss you, new year, Diwali, father's day. This is the most beautiful way to surprise your love once. Actual product may vary in shape or design as per the availability. Flowers may be delivered in fully bloomed, semi-bloomed or bud stage. Since flowers are perishable in nature, we attempt delivery of your order only once. The delivery cannot be redirected to any other address. This product is hand delivered and will not be delivered along with courier products. Occasionally, substitution of flowers is necessary due to temporary and/or regional unavailability issues.",
    "₹ 350.00",
    "",
    "25%",
    "Bunch of 12",
    "4.5",
    ""
  ),
  (
    "P2",
    "Fresh flower glass vase arrangements",
    "Beautifully arranged in a Cylindrical Glass Vase. The Special Glass Vase Arrangement of 20 Mix Fresh Flowers with Seasonal Fillers. It will brighten up and give life to the room. It will give aesthatic vibe to ones place and is a perfect gift for house warming parties. Special care instruction: these are fresh flowers, please keep the flowers away from direct sunlight or near any other source of excessive heat and fire, please do not apply pressure. Visit BloomsBay and order the most beautiful flowers within a single click. Carry out this best flower delivery offered to you throughout the corners of India and let this beautiful fresh flower glass vase speak its own language of charm and love. Whenever you want to express your feelings towards someone, sending flowers would be the best way to do it. Express your feeling with BLOOMSBAY large range of Floral Arrangements / Floral Gifts which will surely bring a smile on your loved once. Actual product may vary in shape or design as per the availability. Flowers may be delivered in fully bloomed, semi-bloomed or bud stage. Since flowers are perishable in nature, we attempt delivery of your order only once. The delivery cannot be redirected to any other address. This product is hand delivered and will not be delivered along with courier products. Occasionally, substitution of flowers is necessary due to temporary and/or regional unavailability issues.",
    "₹ 450.00",
    "",
    "30%",
    "Arrangement of 20 Mix Fresh Flowers ",
    "4.3",
    ""
  ),
  (
    "P3",
    "Bunch of handmade flowers with Moti-sticks with some fillers",
    "",
    "₹250.00",
    "",
    "40%",
    "",
    "4.0",
    ""
  ),
  (
    "P4",
    "Floral fantasy fresh flowers indoorplant mix flowers bouquet",
    "",
    "₹400.00",
    "",
    "42%",
    "",
    "4.4",
    ""
  ),
  (
    "P5",
    "Fresh flowers mix basket arrangement",
    "",
    "₹350.00",
    "",
    "43%",
    "",
    "4.1",
    ""
  ),
  (
    "P6",
    "Artificial floating flowers for decoration",
    "",
    "₹",
    "",
    "35%",
    "",
    "4.0",
    ""
  ),
  (
    "P7",
    "Bunches fake flowers",
    "",
    "₹",
    "",
    "50%",
    "",
    "3.5",
    ""
  ),
  (
    "P8",
    "Artificial flower garlands",
    "",
    "₹",
    "",
    "42%",
    "",
    "3.7",
    ""
  ),
  (
    "P9",
    "Artificial flower for home decoration and craft",
    "",
    "₹",
    "",
    "45%",
    "",
    "3.6",
    ""
  ),
  (
    "P10",
    "Bunch flower for vase pot home decoration",
    "",
    "₹",
    "",
    "40%",
    "",
    "3.9",
    ""
  ),
  (
    "P11",
    "Artificial flower with wood pot",
    "",
    "₹",
    "",
    "38%",
    "",
    "3.7",
    ""
  ),
  (
    "P12",
    "Dry wreath collections with flowers and pompous grass",
    "",
    "₹",
    "",
    "40%",
    "",
    "3.5",
    ""
  ),
  (
    "P13",
    "Handmade Flowers on cards",
    "",
    "₹",
    "",
    "30%",
    "",
    "4.2",
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
