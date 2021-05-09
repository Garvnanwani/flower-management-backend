const fs = require('fs')
const db = require('../config/db')

const getAllData = async (req, res) => {
    try {
        const Categories = await db.query(`
            SELECT COUNT(*) FROM categories
        `)
        const Products = await db.query(`
            SELECT COUNT(*) FROM products
        `)
        const Orders = await db.query(`
            SELECT COUNT(*) FROM orders
        `)
        const Users = await db.query(`
            SELECT COUNT(*) FROM users
        `)

        return res.json({
            Categories: Categories[0][0]['COUNT(*)'],
            Products: Products[0][0]['COUNT(*)'],
            Orders: Orders[0][0]['COUNT(*)'],
            Users: Users[0][0]['COUNT(*)'],
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getAllData,
}
