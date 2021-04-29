const fs = require('fs')
const path = require('path')
const connect = require('../config/db')

// Delete Image from uploads -> products folder
const deleteImages = (images, mode) => {
    var basePath =
        path.resolve(__dirname + '../../') + '/public/uploads/products/'
    console.log(basePath)
    for (var i = 0; i < images.length; i++) {
        let filePath = ''
        if (mode == 'file') {
            filePath = basePath + `${images[i].filename}`
        } else {
            filePath = basePath + `${images[i]}`
        }
        console.log(filePath)
        if (fs.existsSync(filePath)) {
            console.log('Exists image')
        }
        fs.unlink(filePath, (err) => {
            if (err) {
                return err
            }
        })
    }
}

const getAllProduct = async (req, res) => {
    try {
        const db = await connect()

        const [result, _] = await db.query(`
            SELECT * FROM products
        `)

        res.json({ Products: result })
    } catch {
        res.status(404)
        console.log(err)
    }
}

const postAddProduct = async (req, res) => {
    let {
        pname,
        pdescription,
        pprice,
        psold,
        pquantity,
        pcategory,
        prating,
    } = req.body

    let images = req.files
    // Validation
    if (
        !pname ||
        !pdescription ||
        !pprice ||
        !psold ||
        !pquantity ||
        !pcategory ||
        !prating
    ) {
        deleteImages(images, 'file')
        return res.json({ error: 'All fields must be required' })
    }
    // Validate Name and description
    else if (pName.length > 255 || pDescription.length > 3000) {
        deleteImages(images, 'file')
        return res.json({
            error: 'Name 255 & Description must not be 3000 charecter long',
        })
    }
    // Validate Images
    // else if (images.length !== 2) {
    //     deleteImages(images, 'file')
    //     return res.json({ error: 'Must need to provide 2 images' })
    // }
    else {
        try {
            const db = await connect()

            let allImages = []
            for (const img of images) {
                allImages.push(img.filename)
            }
            const [result, _] = await db.query(
                `
                INSERT INTO products (
                    pname,
                    pdescription,
                    pprice,
                    psold,
                    pquantity,
                    pcategory,
                    prating,
                ) VALUES (
                    ?, ?, ?, ?, ?, ?, ?
                )`,
                [
                    pname,
                    pdescription,
                    pprice,
                    psold,
                    pquantity,
                    pcategory,
                    prating,
                ]
            )
            return res.json({ success: 'Product created successfully' })
        } catch (err) {
            console.log(err)
        }
    }
}

const postEditProduct = async (req, res) => {
    let {
        productid,
        pName,
        pDescription,
        pPrice,
        pQuantity,
        pCategory,
        pOffer,
        pStatus,
        pImages,
    } = req.body
    let editImages = req.files

    // Validate other fileds
    if (
        !productid |
        !pName |
        !pDescription |
        !pPrice |
        !pQuantity |
        !pCategory |
        !pOffer |
        !pStatus
    ) {
        return res.json({ error: 'All fields must be required' })
    }
    // Validate Name and description
    else if (pName.length > 255 || pDescription.length > 3000) {
        return res.json({
            error: 'Name 255 & Description must not be 3000 charecter long',
        })
    }
    // Validate Update Images
    else if (editImages && editImages.length == 1) {
        deleteImages(editImages, 'file')
        return res.json({ error: 'Must need to provide 2 images' })
    } else {
        let editData = {
            pName,
            pDescription,
            pPrice,
            pQuantity,
            pCategory,
            pOffer,
            pStatus,
        }
        if (editImages.length == 2) {
            let allEditImages = []
            for (const img of editImages) {
                allEditImages.push(img.filename)
            }
            editData = { ...editData, pImages: allEditImages }
            deleteImages(pImages.split(','), 'string')
        }
        try {
            let editProduct = productModel.findByIdAndUpdate(
                productid,
                editData
            )
            editProduct.exec((err) => {
                if (err) console.log(err)
                return res.json({ success: 'Product edit successfully' })
            })
        } catch (err) {
            console.log(err)
        }
    }
}

const getDeleteProduct = async (req, res) => {
    let { productid } = req.body
    if (!productid) {
        return res.json({ error: 'All fields must be required' })
    } else {
        try {
            let deleteProductObj = await productModel.findById(productid)
            let deleteProduct = await productModel.findByIdAndDelete(productid)
            if (deleteProduct) {
                // Delete Image from uploads -> products folder
                deleteImages(deleteProductObj.pImages, 'string')
                return res.json({ success: 'Product deleted successfully' })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

const getSingleProduct = async (req, res) => {
    let { productid } = req.body
    if (!productid) {
        return res.json({ error: 'All fields must be required' })
    } else {
        try {
            const db = await connect()

            const [result, _] = await db.query(
                `
                SELECT pcategory, pname FROM products WHERE productid = ?
            `,
                [productid]
            )

            // let singleProduct = await productModel
            //     .findById(productid)
            //     .populate('pCategory', 'cName')
            //     .populate('pRatingsReviews.user', 'name email userImage')

            return res.json({ Product: singleProduct })
        } catch (err) {
            console.log(err)
        }
    }
}

const getProductByCategory = async (req, res) => {
    let { category_id } = req.body
    if (!category_id) {
        return res.json({ error: 'All fields must be required' })
    } else {
        try {
            //also return category name

            const db = await connect()

            const [result, _] = await db.query(
                `
                SELECT products.pcategory, categories.name FROM categories
                INNER JOIN products ON categories.name = products.pcategory;
                WHERE categories.category_id = ?
            `,
                [category_id]
            )

            return res.json({ Products: result })
        } catch (err) {
            return res.json({ error: 'Search product wrong' })
        }
    }
}

const getProductByPrice = async (req, res) => {
    let { price } = req.body
    if (!price) {
        return res.json({ error: 'All fields must be required' })
    } else {
        try {
            //also return category name
            const db = await connect()

            const [result, _] = await db.query(
                `
                SELECT products.pcategory, categories.name FROM categories
                INNER JOIN products ON categories.name = products.pcategory;
                WHERE products.pprice < ?
            `,
                [price]
            )

            return res.json({ Products: result })
        } catch (err) {
            return res.json({ error: 'Filter product wrong' })
        }
    }
}

const getWishProduct = async (req, res) => {
    let { productArray } = req.body
    if (productArray.length === 0) {
        return res.json({ error: 'All fields must be required' })
    } else {
        try {
            const db = await connect()

            const [result, _] = await db.query(
                `
                SELECT * FROM products WHERE productid IN ?
            `,
                [productArray]
            )

            return res.json({ Products: result })
        } catch (err) {
            return res.json({ error: 'Filter product wrong' })
        }
    }
}

const getCartProduct = async (req, res) => {
    let { productArray } = req.body
    if (productArray.length === 0) {
        return res.json({ error: 'All fields must be required' })
    } else {
        try {
            const db = await connect()

            const [result, _] = await db.query(
                `
                SELECT * FROM products WHERE productid IN ?
            `,
                [productArray]
            )

            return res.json({ Products: result })
        } catch (err) {
            return res.json({ error: 'Cart product wrong' })
        }
    }
}

const postAddReview = async (req, res) => {
    let { productid, uId, rating, review } = req.body
    if (!productid || !rating || !review || !uId) {
        return res.json({ error: 'All fields must be required' })
    } else {
        let checkReviewRatingExists = await productModel.findOne({
            _id: productid,
        })
        if (checkReviewRatingExists.pRatingsReviews.length > 0) {
            checkReviewRatingExists.pRatingsReviews.map((item) => {
                if (item.user === uId) {
                    return res.json({
                        error: 'Your already reviewd the product',
                    })
                } else {
                    try {
                        let newRatingReview = productModel.findByIdAndUpdate(
                            productid,
                            {
                                $push: {
                                    pRatingsReviews: {
                                        review: review,
                                        user: uId,
                                        rating: rating,
                                    },
                                },
                            }
                        )
                        newRatingReview.exec((err, result) => {
                            if (err) {
                                console.log(err)
                            }
                            return res.json({
                                success: 'Thanks for your review',
                            })
                        })
                    } catch (err) {
                        return res.json({ error: 'Cart product wrong' })
                    }
                }
            })
        } else {
            try {
                let newRatingReview = productModel.findByIdAndUpdate(
                    productid,
                    {
                        $push: {
                            pRatingsReviews: {
                                review: review,
                                user: uId,
                                rating: rating,
                            },
                        },
                    }
                )
                newRatingReview.exec((err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    return res.json({ success: 'Thanks for your review' })
                })
            } catch (err) {
                return res.json({ error: 'Cart product wrong' })
            }
        }
    }
}

const deleteReview = async (req, res) => {
    let { rId, productid } = req.body
    if (!rId) {
        return res.json({ message: 'All fields must be required' })
    } else {
        try {
            let reviewDelete = productModel.findByIdAndUpdate(productid, {
                $pull: { pRatingsReviews: { _id: rId } },
            })
            reviewDelete.exec((err, result) => {
                if (err) {
                    console.log(err)
                }
                return res.json({ success: 'Your review is deleted' })
            })
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = {
    getAllProduct,
    postAddProduct,
    postEditProduct,
    getSingleProduct,
    getDeleteProduct,
    getProductByCategory,
    getProductByPrice,
    getWishProduct,
    getCartProduct,
    postAddReview,
    deleteReview,
}

// const GetProducts = (request, response) => {
//     try {
//         let query = `SELECT TOP 10
//                             P.product_id AS 'ProductId',
//                             P.pname AS 'Name',
//                             P.pdescription AS 'Description',
//                             P.pprice AS 'Price',
//                             P.psold AS 'Sold',
//                             P.discounted_price AS 'DiscountedPrice',
//                             P.pquantity AS 'Quantity',
//                             P.prating AS 'Rating',
//                             P.pimage AS 'Image',
//                             P.category_id AS 'CategoryId',
//                     FROM product P, category C, product_category PC
//                     WHERE P.product_id = PC.product_id
//                         AND C.category_id = PC.category_id;` // query database to get all the Categories '

//         let productCountQuery = `SELECT COUNT(P.product_id) AS 'ProductCount'
//                     FROM
//                         product P,
//                         category C,
//                         product_category PC
//                     WHERE P.product_id = PC.product_id
//                         AND C.category_id = PC.category_id
//                      ${filterCategory};`

//         // execute query
//         db.query(query + productCountQuery, [1, 2], (err, result) => {
//             if (err != null) {
//                 response.status(500).send({ error: err.message })
//             }

//             let resultSet = {
//                 Products: result[0],
//                 ProductCount: result[1],
//             }
//             // get product choices
//             let productIdList = []
//             resultSet.Products.forEach((element, index) => {
//                 productIdList.push(element.ProductId)
//             })

//             let productlistString = productIdList.toString()

//             let query = `SELECT
//                 A.name AS 'ChoicesName',
//                 A.choices_id AS 'ChoicesId',
//                 AV.choices_value_id AS 'ChoicesValueId',
//                 AV.value AS 'ChoicesValue',
//                 PA.product_id AS 'ProductId'
//             FROM choices_value CVI
//             INNER JOIN choices A
//                     ON CVI.choices_id = A.choices_id
//             INNER JOIN product_choices PC
//                     ON PC.choices_value_id = CVI.choices_value_id
//             WHERE CVI.choices_value_id IN
//                     (SELECT choices_value_id
//                     FROM   product_choices
//                     WHERE  product_id in (${productlistString}))
//             ORDER BY A.name`

//             // execute query
//             db.query(query, (err, result) => {
//                 if (err != null) {
//                     response.status(500).send({ error: err.message })
//                 }

//                 resultSet.Products.forEach((element, index) => {
//                     var aaa = result.filter(
//                         (a) => a.ProductId == element.ProductId
//                     )
//                     resultSet.Products[index]['materials'] = aaa.filter(
//                         (a) => a.ChoicesId == 1
//                     )
//                     resultSet.Products[index]['types'] = aaa.filter(
//                         (a) => a.ChoicesId == 2
//                     )
//                     resultSet.Products[index]['colours'] = aaa.filter(
//                         (a) => a.ChoicesId == 3
//                     )
//                 })
//                 return response.json(resultSet)
//             })

//             return response.json(result)
//         })
//     } catch (error) {
//         if (error != null) response.status(500).send({ error: error.message })
//     }
// }

// const GetProductChoices = (request, response) => {
//     try {
//         let query =
//             'CALL catalog_get_choices_values(1);CALL catalog_get_choices_values(2);CALL catalog_get_choices_values(3)'
//         // execute query
//         db.query(query, [1, 2, 3], (err, result) => {
//             if (err != null) {
//                 response.status(500).send({ error: err.message })
//             }
//             return response.json({
//                 materials: result[0],
//                 types: result[1],
//                 colours: result[2],
//             })
//         })
//     } catch (error) {}
// }

// const GetFilteredProducts = (request, response) => {
//     try {
//         let filterCategory =
//             request.body.paging.CategoryId == 0
//                 ? 'AND C.category_id = C.category_id'
//                 : `AND C.category_id = ${request.body.paging.CategoryId}`
//         let filterSearchString = ''
//         request.body.paging.SearchString =
//             request.body.paging.SearchString == undefined
//                 ? ''
//                 : request.body.paging.SearchString

//         if (request.body.paging.SearchString == '') {
//             filterSearchString = `P.pname like '%%' OR P.pdescription like '%%'`
//         } else if (request.body.paging.IsAllWords) {
//             let words = request.body.paging.SearchString.split(' ')
//             let likeQuery = []
//             words.forEach((element) => {
//                 likeQuery.push(
//                     `P.pname like '%${element}%' OR P.pdescription like '%${element}%'`
//                 )
//             })
//             filterSearchString = likeQuery.join(' OR ')
//         } else {
//             filterSearchString = `P.pname like '%${request.body.paging.SearchString}%'
//                                  OR P.pdescription like '%${request.body.paging.SearchString}%'`
//         }
//         let query = `SELECT
//                         P.product_id AS 'ProductId',
//                         P.pname AS 'Name',
//                         P.pdescription AS 'Description',
//                         P.pprice AS 'Price',
//                         P.psold AS 'Sold'
//                         P.pdiscounted_price AS 'DiscountedPrice',
//                         P.pquantity AS 'Quantity',
//                         P.prating AS 'Rating',
//                         P.pimage AS 'Image',
//                         C.category_id AS 'CategoryId',
//                         C.name AS 'CategoryName'
//                     FROM product P, category C, product_category PC
//                     WHERE P.product_id = PC.product_id
//                         AND C.category_id = PC.category_id
//                          ${filterCategory}
//                         AND (${filterSearchString})
//                     LIMIT ${request.body.paging.PageNumber}, ${request.body.paging.PageSize};` // query database to get all the categories

//         let productCountQuery = `SELECT COUNT(P.product_id) AS 'ProductCount'
//                                 FROM product P, category C, product_category PC
//                                 WHERE P.product_id = PC.product_id
//                                     AND C.category_id = PC.category_id
//                                     ${filterCategory}
//                                     AND (${filterSearchString});` // query database to get related product count
//         // execute query
//         db.query(query + productCountQuery, [1, 2], (err, result) => {
//             if (err != null) {
//                 return response.status(500).send({ error: err.message })
//             }
//             let resultSet = {
//                 Products: result[0],
//                 ProductCount: result[1],
//             }
//             if (resultSet.Products.length == 0) {
//                 return response.json(resultSet)
//             }
//             // get product attributes
//             let productIdList = []
//             resultSet.Products.forEach((element, index) => {
//                 productIdList.push(element.ProductId)
//             })
//             let productlistString = productIdList.toString()

//             let query = `SELECT
//                 A.name AS 'ChoicesName',
//                 A.choices_id AS 'ChoicesId',
//                 CVI.choices_value_id AS 'ChoicesValueId',
//                 CVI.value AS 'ChoicesValue',
//                 PA.product_id AS 'ProductId'
//             FROM choices_value CVI
//             INNER JOIN choices A
//                     ON CVI.choices_id = A.choices_id
//             INNER JOIN product_choices PA
//                     ON PA.choices_value_id = CVI.choices_value_id
//             WHERE CVI.choices_value_id IN
//                     (SELECT choices_value_id
//                     FROM   product_choices
//                     WHERE  product_id in (${productlistString}))
//             ORDER BY A.name`

//             // execute query
//             db.query(query, (err, result) => {
//                 if (err != null) {
//                     response.status(500).send({ error: err.message })
//                 }

//                 resultSet.Products.forEach((element, index) => {
//                     var aaa = result.filter(
//                         (a) => a.ProductId == element.ProductId
//                     )
//                     resultSet.Products[index]['materials'] = aaa
//                         .filter((a) => a.ChoicesId == 1)
//                         .sort(function (a, b) {
//                             return a.ChoicesValueId - b.ChoicesValueId
//                         })
//                     resultSet.Products[index]['types'] = aaa
//                         .filter((a) => a.ChoicesId == 2)
//                         .sort(function (a, b) {
//                             return a.ChoicesValueId - b.ChoicesValueId
//                         })
//                     resultSet.Products[index]['Colours'] = aaa
//                         .filter((a) => a.ChoicesId == 3)
//                         .sort(function (a, b) {
//                             return a.ChoicesValueId - b.ChoicesValueId
//                         })
//                 })
//                 return response.json(resultSet)
//             })
//         })
//     } catch (err) {
//         if (err != null) {
//             response.status(500).send({ error: err })
//         }
//     }
// }

// const GetProductDetailsById = (request, response) => {
//     try {
//         let query = `SELECT
//                         P.product_id AS 'ProductId',
//                         P.name AS 'Name',
//                         P.description AS 'Description',
//                         P.price AS 'Price',
//                         P.psold AS 'Sold',
//                         P.discounted_price AS 'DescountedPrice',
//                         P.pquantity AS 'Quantity',
//                         P.prating AS 'Rating',
//                         P.pimage AS 'Image',
//                         C.category_id AS 'CategoryId',
//                         C.name AS 'CategoryName'
//                     FROM
//                         product P,
//                         category C,
//                         product_category PC
//                     WHERE P.product_id = PC.product_id
//                     AND C.category_id = PC.category_id
//                     AND P.product_id = ${request.query.productId}` // query database to get all the categories

//         // execute query
//         db.query(query, (err, result) => {
//             if (err != null) {
//                 response.status(500).send({ error: err.message })
//             }
//             let productDetails = result[0]
//             let subquery = `SELECT
//                             A.name AS 'ChoicesName',
//                             A.choices_id AS 'ChoicesId',
//                             CVI.choices_value_id AS 'ChoicesValueId',
//                             CVI.value AS 'ChoicesValue',
//                             PA.product_id AS 'ProductId'
//                         FROM choices_value CVI
//                         INNER JOIN choices A
//                                 ON CVI.choices_id = A.choices_id
//                         INNER JOIN product_choices PA
//                                 ON PA.choices_value_id = CVI.attribute_value_id
//                         WHERE PA.product_id = ${request.query.productId}
//                         ORDER BY A.name`

//             // execute query
//             db.query(subquery, (err, results) => {
//                 if (err != null) {
//                     response.status(500).send({ error: err.message })
//                 }

//                 productDetails['materials'] = results
//                     .filter((a) => a.ChoicesId == 1)
//                     .sort(function (a, b) {
//                         return a.ChoicesValueId - b.ChoicesValueId
//                     })
//                 productDetails['types'] = results
//                     .filter((a) => a.ChoicesId == 2)
//                     .sort(function (a, b) {
//                         return a.ChoicesValueId - b.ChoicesValueId
//                     })
//                 productDetails['colours'] = results
//                     .filter((a) => a.ChoicesId == 3)
//                     .sort(function (a, b) {
//                         return a.ChoicesValueId - b.ChoicesValueId
//                     })

//                 return response.json(productDetails)
//             })
//         })
//     } catch (err) {
//         if (err != null) {
//             response.status(500).send({ error: err })
//         }
//     }
// }

// module.exports = {
//     GetProducts,
//     GetProductChoices,
//     GetFilteredProducts,
//     GetProductDetailsById,
// }
