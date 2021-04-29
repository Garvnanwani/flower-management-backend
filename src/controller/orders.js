const connect = require('../config/db')

const getAllOrders = async (req, res) => {
    try {
        const db = await connect()

        const [result, _] = await db.query(`
            SELECT orders.order_id, users.name, users.email, order_details.product_name ,order_details.product_price
            FROM ((orders
            INNER JOIN users ON orders.user_id = users.userid)
            INNER JOIN order_details ON orders.order_id = order_details.order_id)
        `)

        return res.json({ Orders: result })
    } catch (err) {
        console.log(err)
    }
}

const getOrderByUser = async (req, res) => {
    let { userid } = req.body
    if (!userid) {
        return res.json({ message: 'All fields must be required' })
    } else {
        try {
            const db = await connect()

            const [result, _] = await db.query(
                `
            SELECT orders.order_id, users.name, users.email, order_details.product_name ,order_details.product_price
            FROM ((orders
            INNER JOIN users ON orders.user_id = users.userid)
            INNER JOIN order_details ON orders.order_id = order_details.order_id)
            WHERE users.userid = ?
        `,
                [userid]
            )
            return res.json({ Order: result })
        } catch (err) {
            console.log(err)
        }
    }
}

const postCreateOrder = async (req, res) => {
    let { allProduct, user, amount, transactionId, address, phone } = req.body
    if (
        !allProduct ||
        !user ||
        !amount
        // !transactionId ||
        // !address ||
        // !phone
    ) {
        return res.json({ message: 'All fields must be required' })
    } else {
        try {
            const db = await connect()

            const _ = db.query(
                `
                INSERT INTO orders (user_id, total_amount) VALUES (?, ?)
            `,
                [user, amount]
            )

            let values = []
            allProduct.forEach((order_item) => {
                let row = ''
                row = `(
                        ${order_item.order_id},
                        ${order_item.product_id},
                        ${order_item.product_name},
                        ${order_item.quantity},
                        ${order_item.product_price},
                )`
                values.push(row)
            })
            let rows = values.toString()

            const _ = db.query(
                `
                INSERT INTO order_detail
                    (order_id, product_id, product_name, quantity, product_price)
                VALUES ?`,
                [rows]
            )
            return res.json({ success: 'Order created successfully' })
        } catch (err) {
            return res.json({ error: error })
        }
    }
}

// const postUpdateOrder = async (req, res) => {
//     let { order_id } = req.body
//     if (!order_id || !status) {
//         return res.json({ message: 'All fields must be required' })
//     } else {
//         let currentOrder = orderModel.findByIdAndUpdate(order_id, {
//             status: status,
//             updatedAt: Date.now(),
//         })
//         currentOrder.exec((err, result) => {
//             if (err) console.log(err)
//             return res.json({ success: 'Order updated successfully' })
//         })
//     }
// }

const postDeleteOrder = async (req, res) => {
    let { order_id } = req.body
    if (!order_id) {
        return res.json({ error: 'All fields must be required' })
    } else {
        try {
            const db = await connect()

            const _ = await db.query(
                `
                DELETE FROM orders WHERE order_id = ?
            `,
                [order_id]
            )

            const _ = await db.query(
                `
                DELETE FROM order_details WHERE order_id = ?
            `,
                [order_id]
            )
            return res.json({ success: 'Order deleted successfully' })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = {
    getAllOrders,
    getOrderByUser,
    postCreateOrder,
    // postUpdateOrder,
    postDeleteOrder,
}
