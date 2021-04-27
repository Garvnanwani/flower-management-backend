const connect = require('../config/db')

const getAllOrders = async (req, res) => {
    try {
        let Orders = await orderModel
            .find({})
            .populate('allProduct.id', 'pName pImages pPrice')
            .populate('user', 'name email')
            .sort({ _id: -1 })
        if (Orders) {
            return res.json({ Orders })
        }
    } catch (err) {
        console.log(err)
    }
}

const getOrderByUser = async (req, res) => {
    let { uId } = req.body
    if (!uId) {
        return res.json({ message: 'All filled must be required' })
    } else {
        try {
            let Order = await orderModel
                .find({ user: uId })
                .populate('allProduct.id', 'pName pImages pPrice')
                .populate('user', 'name email')
                .sort({ _id: -1 })
            if (Order) {
                return res.json({ Order })
            }
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
        !amount ||
        !transactionId ||
        !address ||
        !phone
    ) {
        return res.json({ message: 'All filled must be required' })
    } else {
        try {
            let newOrder = new orderModel({
                allProduct,
                user,
                amount,
                transactionId,
                address,
                phone,
            })
            let save = await newOrder.save()
            if (save) {
                return res.json({ success: 'Order created successfully' })
            }
        } catch (err) {
            return res.json({ error: error })
        }
    }
}

const postUpdateOrder = async (req, res) => {
    let { oId, status } = req.body
    if (!oId || !status) {
        return res.json({ message: 'All filled must be required' })
    } else {
        let currentOrder = orderModel.findByIdAndUpdate(oId, {
            status: status,
            updatedAt: Date.now(),
        })
        currentOrder.exec((err, result) => {
            if (err) console.log(err)
            return res.json({ success: 'Order updated successfully' })
        })
    }
}

const postDeleteOrder = async (req, res) => {
    let { oId } = req.body
    if (!oId) {
        return res.json({ error: 'All filled must be required' })
    } else {
        try {
            let deleteOrder = await orderModel.findByIdAndDelete(oId)
            if (deleteOrder) {
                return res.json({ success: 'Order deleted successfully' })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = {
    getAllOrders,
    getOrderByUser,
    postCreateOrder,
    postUpdateOrder,
    postDeleteOrder,
}

// const nodemailer = require('nodemailer')

// const CreateOrder = (request, response) => {
//     try {
//         const user = request.body.User
//         const cart = request.body.Cart
//         const remark = request.body.Remarks
//         const totalAmount = request.body.TotalAmount

//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             auth: {
//                 user: 'abc@gmail.com',
//                 pass: 'abc123',
//             },
//             // host: 'bbghgkymw2dsxofwagqm-mysql.services.clever-cloud.com',
//             // port:3306 ,
//             // auth: {
//             //     user: 'uhhwe83khqkwpdly',
//             //     pass: 'iGcuguP1nxOGx23lGRrD'
//             // }
//         })

//         let mailOptions = {
//             from: 'abc@gmail.com',
//             to: `${user.Email}`,
//             subject: 'Congratulations! Your order placed succesfully.', // Subject line
//             text: `Hello ${user.Name}`, // plain text body
//             html: `<b>Hello  ${user.Name} </b>`,
//         }
//         // send mail with defined transport object
//         transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log(error)
//                 return response.json(error)
//             } else {
//                 console.log('Email sent: ' + info.response)

//                 let query = `INSERT INTO orders
//                                 (total_amount, created_on, status, user_id, product_id, phone_number)
//                             VALUES
//                             (
//                                 ${totalAmount},
//                                 CURDATE(),
//                                 CURDATE(),
//                                 1,
//                                 '${remark}',
//                                 ${users.UserId},
//                                 '',
//                                 '',
//                                 1,
//                                 1
//                             );` //query database to get all the categories

//                 // execute query
//                 db.query(query, (err, result) => {
//                     if (err != null)
//                         response.status(500).send({ error: error.message })
//                     let values = []
//                     cart.forEach((element) => {
//                         let row = ''
//                         row = `(
//                             ${result.insertId},
//                             ${element.ProductId},
//                             '',
//                             ${element.Quantity},
//                             ${element.Price}
//                         )`
//                         values.push(row)
//                     })
//                     let rows = values.toString()

//                     let subQuery = `INSERT INTO order_detail
//                                         (order_id, product_id, product_name, quantity, unit_cost,payment_mode)
//                                     values ${rows};` //query database to get all the categories

//                     db.query(subQuery, (err, result) => {
//                         if (err != null)
//                             response.status(500).send({ error: err.message })
//                         return response.json(result)
//                     })

//                     return response.json(result)
//                 })
//             }
//         })
//     } catch (error) {
//         if (error != null) response.status(500).send({ error: error.message })
//     }
// }

// const SendTestMail = async () => {
//     let remark = 'test mail'

//     let testAccount = await nodemailer.createTestAccount()

//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: 'abc@gmail.com',
//             pass: 'abc123',
//         },
//     })

//     // const transporter = nodemailer.createTransport({
//     //     // service: 'gmail',
//     //     // auth: {
//     //     //     user: 'abc@gmail.com',
//     //     //     pass: '******'
//     //     // }
//     // });

//     let mailOptions = {
//         from: '" abc " <no-reply@abc.com>',
//         to: 'def@gmail.com',
//         subject: 'Order Details', // Subject line
//         text: 'test purpose', // plain text body
//         html: `<b>test account ${remark} </b>`,
//     }

//     await transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error)
//             return response.json(error)
//         } else {
//             console.log('Email sent: ' + info.response)
//         }
//     })
// }

// module.exports = {
//     CreateOrder,
//     SendTestMail,
// }
