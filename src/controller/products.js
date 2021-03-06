const fs = require('fs')
const path = require('path')
const db = require('../config/db')

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
        const [result, _] = await db.query(`
            SELECT * FROM products
        `)

        res.json({ Products: result })
    } catch (err) {
        res.status(404)
        console.log(err)
    }
}

const postAddProduct = async (req, res) => {
    let {
        pName,
        pDescription,
        pPrice,
        pQuantity,
        pCategory,
        pStatus,
    } = req.body

    let image = req.files[0]

    // Validation
    if (
        !pName ||
        !pDescription ||
        !pPrice ||
        !pQuantity ||
        !pCategory ||
        !pStatus
    ) {
        return res.json({ error: 'All fields must be required' })
    } else if (pName.length > 255 || pDescription.length > 3000) {
        return res.json({
            error: 'Name 255 & Description must not be 3000 character long',
        })
    } else {
        try {
            pImage = image.filename
            const [result, _] = await db.query(
                `
                INSERT INTO products (
                    pName,
                    pDescription,
                    pPrice,
                    pQuantity,
                    pCategory,
                    pStatus,
                    pImage
                ) VALUES (
                    ?, ?, ?, ?, ?, ?, ?
                )`,
                [
                    pName,
                    pDescription,
                    pPrice,
                    pQuantity,
                    pCategory,
                    pStatus,
                    pImage,
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
        product_id,
        pName,
        pDescription,
        pPrice,
        pQuantity,
        pCategory,
        pStatus,
    } = req.body
    let editImages = req.files

    // Validate other fileds
    if (
        !product_id ||
        !pName ||
        !pDescription ||
        !pPrice ||
        !pQuantity ||
        !pCategory ||
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

    try {
        const [result, _] = await db.query(
            `
            UPDATE products
            SET pName = ?,
                pDescription = ?,
                pPrice = ?,
                pQuantity = ?,
                pCategory = ?,
                pStatus = ?
            WHERE product_id = ?
            `,
            [
                pName,
                pDescription,
                pPrice,
                pQuantity,
                pCategory,
                pStatus,
                product_id,
            ]
        )

        return res.json({ success: 'Product edit successfully' })
    } catch (err) {
        console.log(err)
    }
}

const getDeleteProduct = async (req, res) => {
    let { product_id } = req.body
    if (!product_id) {
        return res.json({ error: 'All fields must be required' })
    } else {
        try {
            const [result, _] = await db.query(
                `
                DELETE FROM products WHERE product_id = ?
            `,
                [product_id]
            )
            if (result.length > 0) {
                // Delete Image from uploads -> products folder
                deleteImages(deleteProductObj.pimages, 'string')
            }

            return res.json({ success: 'Product deleted successfully' })
        } catch (err) {
            console.log(err)
        }
    }
}

const getSingleProduct = async (req, res) => {
    let { product_id } = req.body
    if (!product_id) {
        return res.json({ error: 'All fields must be required' })
    } else {
        try {
            const [result, _] = await db.query(
                `
                SELECT * FROM categories
                INNER JOIN products ON categories.cName = products.pCategory
                WHERE products.product_id = ?`,
                [product_id]
            )

            return res.json({ Product: result[0] })
        } catch (err) {
            console.log(err)

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
            const [result, _] = await db.query(
                `
                SELECT *  FROM categories
                INNER JOIN products ON categories.cName = products.pCategory
                WHERE categories.category_id = ?
            `,
                [category_id]
            )

            return res.json({ Products: result })
        } catch (err) {
            console.log(err)

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
            const [result, _] = await db.query(
                `
                SELECT products.pCategory, categories.cName FROM categories
                INNER JOIN products ON categories.cName = products.pCategory
                WHERE products.pPrice < ?
            `,
                [price]
            )

            return res.json({ Products: result })
        } catch (err) {
            console.log(err)

            return res.json({ error: 'Filter product wrong' })
        }
    }
}

const getWishProduct = async (req, res) => {
    let { productArray } = req.body
    if (productArray && productArray.length === 0) {
        return res.json({ error: 'All fields must be required' })
    } else {
        try {
            const [result, _] = await db.query(
                `
                SELECT * FROM products WHERE product_id IN (?)
            `,
                [productArray]
            )

            return res.json({ Products: result })
        } catch (err) {
            console.log(err)

            return res.json({ error: 'Filter product wrong' })
        }
    }
}

const getCartProduct = async (req, res) => {
    let { productArray } = req.body
    if (productArray && productArray.length === 0) {
        return res.json({ error: 'All fields must be required' })
    } else {
        try {
            const [result, _] = await db.query(
                `
                SELECT * FROM products WHERE product_id IN (?)
            `,
                [productArray]
            )

            return res.json({ Products: result })
        } catch (err) {
            console.log(err)
            return res.json({ error: 'Cart product wrong' })
        }
    }
}

const postAddReview = async (req, res) => {
    let { product_id, user_id, rating, review } = req.body
    if (!product_id || !rating || !review || !user_id) {
        return res.json({ error: 'All fields must be required' })
    } else {
        try {
            const [result, _] = await db.query(
                `
                INSERT INTO reviews (product_id, user_id, rating, review) VALUES (?,?,?,?)
            `,
                [product_id, user_id, rating, review]
            )
        } catch (err) {
            console.log(err)
            res.json({ error: 'Cart Product Wrong' })
        }
    }
}

const deleteReview = async (req, res) => {
    let { review_id, product_id } = req.body
    if (!review_id) {
        return res.json({ message: 'All fields must be required' })
    } else {
        try {
            const [result, _] = await db.query(
                `
                DELETE FROM reviews WHERE review_id = ?
            `,
                [review_id]
            )
            return res.json({ success: 'Your review is deleted' })
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
