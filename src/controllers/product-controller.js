const GetProducts = (request, response) => {
    try {
        let query = `SELECT TOP 10
                            P.product_id AS 'ProductId',
                            P.pname AS 'Name',
                            P.pdescription AS 'Description',
                            P.pprice AS 'Price',
                            P.psold AS 'Sold',
                            P.discounted_price AS 'DiscountedPrice',
                            P.pquantity AS 'Quantity',
                            P.prating AS 'Rating',
                            P.pimage AS 'Image',
                            P.category_id AS 'CategoryId',
                    FROM product P, category C, product_category PC
                    WHERE P.product_id = PC.product_id 
                        AND C.category_id = PC.category_id;`; // query database to get all the Categories '

        let productCountQuery = `SELECT COUNT(P.product_id) AS 'ProductCount'
                    FROM 
                        product P, 
                        category C, 
                        product_category PC
                    WHERE P.product_id = PC.product_id 
                        AND C.category_id = PC.category_id
                     ${filterCategory};`;

        // execute query
        db.query(query + productCountQuery, [1, 2], (err, result) => {
            if (err != null){
                response.status(500).send({ error: err.message });
            }

            let resultSet = {
                Products: result[0], 
                ProductCount: result[1]
            }
            // get product choices
            let productIdList = [];
            resultSet.Products.forEach((element, index) => {
                 productIdList.push(element.ProductId);
            });

            let productlistString = productIdList.toString();

            let query = `SELECT 
                A.name AS 'ChoicesName',
                A.choices_id AS 'ChoicesId',
                AV.choices_value_id AS 'ChoicesValueId',
                AV.value AS 'ChoicesValue',
                PA.product_id AS 'ProductId'
            FROM choices_value CVI
            INNER JOIN choices A
                    ON CVI.choices_id = A.choices_id
            INNER JOIN product_choices PC
                    ON PC.choices_value_id = CVI.choices_value_id
            WHERE CVI.choices_value_id IN
                    (SELECT choices_value_id
                    FROM   product_choices
                    WHERE  product_id in (${productlistString}))
            ORDER BY A.name`;

            // execute query
            db.query(query, (err, result) => {
                if (err != null){
                    response.status(500).send({ error: err.message });
                }

                resultSet.Products.forEach((element,index) => {
                    var aaa = result.filter(a => a.ProductId == element.ProductId);
                    resultSet.Products[index]['materials'] = aaa.filter(a => a.ChoicesId == 1);
                    resultSet.Products[index]['types'] = aaa.filter(a => a.ChoicesId == 2);
                    resultSet.Products[index]['colours'] = aaa.filter(a => a.ChoicesId == 3);
                });
                return response.json(resultSet);
            });

           return response.json(result);
       });
    } catch (error) {
        if (error != null) response.status(500).send({ error: error.message });
    }
};

const GetProductChoices = (request, response) => {
    try {
        let query = 'CALL catalog_get_choices_values(1);CALL catalog_get_choices_values(2);CALL catalog_get_choices_values(3)'
        // execute query
        db.query(query, [1, 2, 3], (err, result) => {
            if (err != null){
                response.status(500).send({ error: err.message });
               }
            return response.json({materials: result[0], types: result[1], colours: result[2]});
        });
    } catch (error) {
        
    }
};

const GetFilteredProducts = (request, response) => {
    try {
        let filterCategory = (request.body.paging.CategoryId == 0) ? 'AND C.category_id = C.category_id' : `AND C.category_id = ${request.body.paging.CategoryId}`;
        let filterSearchString = ''; 
        request.body.paging.SearchString = (request.body.paging.SearchString == undefined) ? '': request.body.paging.SearchString;
        
        if(request.body.paging.SearchString == ''){
            filterSearchString = `P.pname like '%%' OR P.pdescription like '%%'`;
        } else if(request.body.paging.IsAllWords) {
            let words = request.body.paging.SearchString.split(' ');
            let likeQuery = [];
            words.forEach(element => {
                likeQuery.push(`P.pname like '%${element}%' OR P.pdescription like '%${element}%'`);
            });
            filterSearchString = likeQuery.join(' OR ');
        } else{
            filterSearchString = `P.pname like '%${request.body.paging.SearchString}%' 
                                 OR P.pdescription like '%${request.body.paging.SearchString}%'`;
        }
        let query = `SELECT 
                        P.product_id AS 'ProductId',
                        P.pname AS 'Name',
                        P.pdescription AS 'Description',
                        P.pprice AS 'Price',
                        P.psold AS 'Sold'
                        P.pdiscounted_price AS 'DiscountedPrice',
                        P.pquantity AS 'Quantity',
                        P.prating AS 'Rating',
                        P.pimage AS 'Image',
                        C.category_id AS 'CategoryId',
                        C.name AS 'CategoryName'
                    FROM product P, category C, product_category PC
                    WHERE P.product_id = PC.product_id 
                        AND C.category_id = PC.category_id
                         ${filterCategory}
                        AND (${filterSearchString})
                    LIMIT ${request.body.paging.PageNumber}, ${request.body.paging.PageSize};`; // query database to get all the categories

        let productCountQuery = `SELECT COUNT(P.product_id) AS 'ProductCount'
                                FROM product P, category C, product_category PC
                                WHERE P.product_id = PC.product_id 
                                    AND C.category_id = PC.category_id
                                    ${filterCategory}
                                    AND (${filterSearchString});`; // query database to get related product count
        // execute query
        db.query(query + productCountQuery, [1, 2], (err, result) => {
           if (err != null){
            return response.status(500).send({ error: err.message });
           }
            let resultSet = {
               Products: result[0], 
               ProductCount: result[1]
            }
            if(resultSet.Products.length == 0){
                return response.json(resultSet);
            }
           // get product attributes
            let productIdList = [];
            resultSet.Products.forEach((element, index) => {
                productIdList.push(element.ProductId);
            });
            let productlistString = productIdList.toString();

            let query = `SELECT 
                A.name AS 'ChoicesName',
                A.choices_id AS 'ChoicesId',
                CVI.choices_value_id AS 'ChoicesValueId',
                CVI.value AS 'ChoicesValue',
                PA.product_id AS 'ProductId'
            FROM choices_value CVI
            INNER JOIN choices A
                    ON CVI.choices_id = A.choices_id
            INNER JOIN product_choices PA
                    ON PA.choices_value_id = CVI.choices_value_id
            WHERE CVI.choices_value_id IN
                    (SELECT choices_value_id
                    FROM   product_choices
                    WHERE  product_id in (${productlistString}))
            ORDER BY A.name`;

            // execute query
            db.query(query, (err, result) => {
                if (err != null){
                    response.status(500).send({ error: err.message });
                }

                resultSet.Products.forEach((element,index) => {
                    var aaa = result.filter(a => a.ProductId == element.ProductId);
                    resultSet.Products[index]['materials'] = aaa.filter(a => a.ChoicesId == 1).sort(function(a, b){return a.ChoicesValueId - b.ChoicesValueId});
                    resultSet.Products[index]['types'] = aaa.filter(a => a.ChoicesId == 2).sort(function(a, b){return a.ChoicesValueId - b.ChoicesValueId});
                    resultSet.Products[index]['Colours'] = aaa.filter(a => a.ChoicesId == 3).sort(function(a, b){return a.ChoicesValueId - b.ChoicesValueId});
                });
                return response.json(resultSet);
            });

       });
    } catch (err) {
        if (err != null) {
            response.status(500).send({ error: err });
        }
    }
};

const GetProductDetailsById = (request, response) => {
    try {
        let query = `SELECT 
                        P.product_id AS 'ProductId',
                        P.name AS 'Name',
                        P.description AS 'Description',
                        P.price AS 'Price',
                        P.psold AS 'Sold',
                        P.discounted_price AS 'DescountedPrice',
                        P.pquantity AS 'Quantity',
                        P.prating AS 'Rating',
                        P.pimage AS 'Image',
                        C.category_id AS 'CategoryId',
                        C.name AS 'CategoryName'
                    FROM 
                        product P, 
                        category C, 
                        product_category PC
                    WHERE P.product_id = PC.product_id 
                    AND C.category_id = PC.category_id
                    AND P.product_id = ${request.query.productId}`; // query database to get all the categories

        // execute query
        db.query(query ,(err, result) => {
            if (err != null){
                response.status(500).send({ error: err.message });
            }
            let productDetails = result[0];
            let subquery = `SELECT 
                            A.name AS 'ChoicesName',
                            A.choices_id AS 'ChoicesId',
                            CVI.choices_value_id AS 'ChoicesValueId',
                            CVI.value AS 'ChoicesValue',
                            PA.product_id AS 'ProductId'
                        FROM choices_value CVI
                        INNER JOIN choices A
                                ON CVI.choices_id = A.choices_id
                        INNER JOIN product_choices PA
                                ON PA.choices_value_id = CVI.attribute_value_id
                        WHERE PA.product_id = ${request.query.productId}
                        ORDER BY A.name`;

            // execute query
            db.query(subquery, (err, results) => {
                if (err != null){
                    response.status(500).send({ error: err.message });
                }

                productDetails['materials'] = results.filter(a => a.ChoicesId == 1).sort(function(a, b){return a.ChoicesValueId - b.ChoicesValueId});
                productDetails['types'] = results.filter(a => a.ChoicesId == 2).sort(function(a, b){return a.ChoicesValueId - b.ChoicesValueId});
                productDetails['colours'] = results.filter(a => a.ChoicesId == 3).sort(function(a, b){return a.ChoicesValueId - b.ChoicesValueId});

                return response.json(productDetails);
            });

       });
    } catch (err) {
        if (err != null) {
            response.status(500).send({ error: err });
        }
    }
};

const product = {
    GetProducts,
    GetProductChoices,
    GetFilteredProducts,
    GetProductDetailsById
};

module.exports = product;
