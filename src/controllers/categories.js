const connect = require('../config/db')

const getAllCategory = async (req, res) => {
    try {
        const db = await connect()

        let query = `SELECT
                        A.category_id AS 'CategoryId',
                        A.name AS 'Name',
                        A.description AS 'Description'
                        A.category_image AS 'CategoryImage'
                    FROM category A
                    ORDER BY category_id ASC` // query database to get all the categories

        // execute query
        const result = await db.query(query)

        return res.json(result)
    } catch (err) {
        console.log(err)
    }
}

const postAddCategory = async (req, res) => {
    let { cName, cDescription, cStatus } = req.body
    let cImage = req.file.filename
    const filePath = `../server/public/uploads/categories/${cImage}`

    if (!cName || !cDescription || !cStatus || !cImage) {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err)
            }
            return res.json({ error: 'All filled must be required' })
        })
    } else {
        cName = toTitleCase(cName)
        try {
            let checkCategoryExists = await categoryModel.findOne({
                cName: cName,
            })
            if (checkCategoryExists) {
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.log(err)
                    }
                    return res.json({ error: 'Category already exists' })
                })
            } else {
                let newCategory = new categoryModel({
                    cName,
                    cDescription,
                    cStatus,
                    cImage,
                })
                await newCategory.save((err) => {
                    if (!err) {
                        return res.json({
                            success: 'Category created successfully',
                        })
                    }
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
