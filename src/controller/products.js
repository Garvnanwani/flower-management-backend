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
    else if (pname.length > 255 || pdescription.length > 3000) {
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
        pname,
        pdescription,
        pprice,
        pquantity,
        pcategory,
        pimages,
    } = req.body
    let editImages = req.files

    // Validate other fileds
    if (
        !productid ||
        !pname ||
        !pdescription ||
        !pprice ||
        !pquantity ||
        !pcategory
    ) {
        return res.json({ error: 'All fields must be required' })
    }
    // Validate Name and description
    else if (pname.length > 255 || pdescription.length > 3000) {
        return res.json({
            error: 'Name 255 & Description must not be 3000 charecter long',
        })
    }
    // Validate Update Images
    // else if (editImages && editImages.length == 1) {
    //     deleteImages(editImages, 'file')
    //     return res.json({ error: 'Must need to provide 2 images' })
    // }
    else {
        // if (editImages.length == 2) {
        //     let allEditImages = []
        //     for (const img of editImages) {
        //         allEditImages.push(img.filename)
        //     }
        //     editData = { ...editData, pimages: allEditImages }
        //     deleteImages(pimages.split(','), 'string')
    }
    try {
        const db = await connect()

        const [result, _] = await db.query(
            `
            UPDATE products
            SET productid : ?
                pname : ?
                pdescription : ?
                pprice : ?
                pquantity : ?
                pcategory : ?
                pimages : ?
            `,
            [
                productid,
                pname,
                pdescription,
                pprice,
                pquantity,
                pcategory,
                pimages,
            ]
        )

        return res.json({ success: 'Product edit successfully' })
    } catch (err) {
        console.log(err)
    }
}

const getDeleteProduct = async (req, res) => {
    let { productid } = req.body
    if (!productid) {
        return res.json({ error: 'All fields must be required' })
    } else {
        try {
            const db = await connect()

            const [result, _] = await db.query(
                `
                DELETE FROM products WHERE productid = ?
            `,
                [productid]
            )

            return res.json({ success: 'Product deleted successfully' })

            // if (deleteProduct) {
            //     // Delete Image from uploads -> products folder
            //     deleteImages(deleteProductObj.pimages, 'string')
            // }
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
                SELECT products.pcategory, categories.name FROM categories
                INNER JOIN products ON categories.name = products.pcategory;
                WHERE products.productid < ?
            `,
                [productid]
            )

            // let singleProduct = await productModel
            //     .findById(productid)
            //     .populate('pcategory', 'cName')
            //     .populate('pRatingsReviews.user', 'name email userImage')

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
            console.log(err)

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
            console.log(err)

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
            console.log(err)
            return res.json({ error: 'Cart product wrong' })
        }
    }
}

const postAddReview = async (req, res) => {
    let { productid, userid, rating, review } = req.body
    if (!productid || !rating || !review || !userid) {
        return res.json({ error: 'All fields must be required' })
    } else {
        try {
            const db = await connect()

            const [result, _] = await db.query(
                `
                INSERT INTO reviews (productid, userid, rating, review) VALUES (?,?,?,?)
            `,
                [productid, userid, rating, review]
            )
        } catch (err) {
            console.log(err)
            res.json({ error: 'Cart Product Wrong' })
        }
    }
}

const deleteReview = async (req, res) => {
    let { review_id, productid } = req.body
    if (!review_id) {
        return res.json({ message: 'All fields must be required' })
    } else {
        try {
            const db = await connect()

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
