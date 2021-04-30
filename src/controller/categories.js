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
    let { cName, cDescription, cStatus } = req.body
    let category_image = req.file.filename
    // const filePath = `./public/uploads/categories/${category_image}`

    if (!cName || !cDescription || !cStatus) {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err)
            }
            return res.json({ error: 'All fields must be required' })
        })
    } else {
        cName = toTitleCase(cName)
        try {
            const db = await connect()

            const [result, _] = await db.query(
                `
                SELECT * FROM categories WHERE cName=?
            `,
                [cName]
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
                INSERT INTO categories (cName, cDescription,cStatus) VALUES (?, ?)
                `,
                    [cName, cDescription, cStatus]
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
    let { category_id, cDescription } = req.body
    if (!category_id || !cDescription) {
        return res.json({ error: 'All fields must be required' })
    }
    try {
        const db = await connect()

        const [result, _] = await db.query(
            `
        UPDATE categories
        SET
            cDescription = ?
        WHERE
            category_id = ?
        `,
            [cDescription, category_id]
        )
        return res.json({ success: 'Category edit successfully' })
    } catch (err) {
        console.log(err)
    }
}

const getDeleteCategory = async (req, res) => {
    let { category_id } = req.body
    if (!category_id) {
        return res.json({ error: 'All fields must be required' })
    } else {
        try {
            const db = await connect()

            // let deletedCategoryFile = await categoryModel.findById(category_id)
            // const filePath = `./public/uploads/categories/${deletedCategoryFile.image}`

            const [result, _] = await db.query(
                `
                DELETE FROM categories WHERE category_id = ?
            `,
                [category_id]
            )

            // if (deleteCategory) {
            //     // Delete Image from uploads -> categories folder
            //     fs.unlink(filePath, (err) => {
            //         if (err) {
            //             console.log(err)
            //         }
            //         return res.json({
            //             success: 'Category deleted successfully',
            //         })
            //     })
            // }
            return res.json({
                success: 'Category deleted successfully',
            })
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
