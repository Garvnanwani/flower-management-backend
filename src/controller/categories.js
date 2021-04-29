const connect = require('../config/db')
const { toTitleCase } = require('../config/function')
const fs = require('fs')

const getAllCategory = async (req, res) => {
    try {
        const db = await connect()

        const [result, _] = await db.query(`
            SELECT * FROM categories
        `)

        return res.json({ Categories: result })
    } catch (err) {
        console.log(err)
    }
}

const postAddCategory = async (req, res) => {
    let { name, description } = req.body
    let category_image = req.file.filename
    const filePath = `./public/uploads/categories/${category_image}`

    if (!name || !description || !category_image) {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err)
            }
            return res.json({ error: 'All filled must be required' })
        })
    } else {
        name = toTitleCase(name)
        try {
            const db = await connect()

            const [result, _] = await db.query(
                `
                SELECT * FROM categories WHERE name=?
            `,
                [name]
            )
            if (result.length > 0) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    return res.json({ error: 'Category already exists' })
                })
            } else {
                const [result, _] = await db.query(
                    `
                INSERT INTO categories (name, description) VALUES (?, ?)
                `,
                    [name, description]
                )

                return res.json({
                    success: 'Category created successfully',
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

const postEditCategory = async (req, res) => {
    let { cId, cDescription, cStatus } = req.body
    if (!cId || !cDescription || !cStatus) {
        return res.json({ error: 'All filled must be required' })
    }
    try {
        let editCategory = categoryModel.findByIdAndUpdate(cId, {
            cDescription,
            cStatus,
            updatedAt: Date.now(),
        })
        let edit = await editCategory.exec()
        if (edit) {
            return res.json({ success: 'Category edit successfully' })
        }
    } catch (err) {
        console.log(err)
    }
}

const getDeleteCategory = async (req, res) => {
    let { cId } = req.body
    if (!cId) {
        return res.json({ error: 'All filled must be required' })
    } else {
        try {
            let deletedCategoryFile = await categoryModel.findById(cId)
            const filePath = `../server/public/uploads/categories/${deletedCategoryFile.cImage}`

            let deleteCategory = await categoryModel.findByIdAndDelete(cId)
            if (deleteCategory) {
                // Delete Image from uploads -> categories folder
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    return res.json({
                        success: 'Category deleted successfully',
                    })
                })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = {
    getAllCategory,
    postAddCategory,
    postEditCategory,
    getDeleteCategory,
}
