const fs = require('fs')
const connect = require('../config/db')

const getAllData = async (req, res) => {
    try {
        const db = await connect()

        const [Categories, _] = await db.query(`
            SELECT * FROM categories
        `)
        const [Products, _] = await db.query(`
            SELECT * FROM products
        `)
        const [Orders, _] = await db.query(`
            SELECT * FROM orders
        `)
        const [Users, _] = await db.query(`
            SELECT * FROM users
        `)

        return res.json({ Categories, Products, Orders, Users })
    } catch (err) {
        console.log(err)
    }
}

const getImages = async (req, res) => {
    try {
        let Images = await customizeModel.find({})
        if (Images) {
            return res.json({ Images })
        }
    } catch (err) {
        console.log(err)
    }
}

const uploadSlideImage = async (req, res) => {
    let image = req.file.filename
    if (!image) {
        return res.json({ error: 'All field required' })
    }
    try {
        let newCustomzie = new customizeModel({
            slideImage: image,
        })
        let save = await newCustomzie.save()
        if (save) {
            return res.json({ success: 'Image upload successfully' })
        }
    } catch (err) {
        console.log(err)
    }
}

const deleteSlideImage = async (req, res) => {
    let { id } = req.body
    if (!id) {
        return res.json({ error: 'All field required' })
    } else {
        try {
            let deletedSlideImage = await customizeModel.findById(id)
            const filePath = `../server/public/uploads/customize/${deletedSlideImage.slideImage}`

            let deleteImage = await customizeModel.findByIdAndDelete(id)
            if (deleteImage) {
                // Delete Image from uploads -> customizes folder
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    return res.json({
                        success: 'Image deleted successfully',
                    })
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = {
    getAllData,
    getImages,
    uploadSlideImage,
    deleteSlideImage,
}
