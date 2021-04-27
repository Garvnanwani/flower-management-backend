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

module.exports = {
    getAllCategory,
}
