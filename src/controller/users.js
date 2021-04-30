const bcrypt = require('bcryptjs')
const connect = require('../config/db')

const getSingleUser = async (req, res) => {
    let { user_id } = req.body

    if (!user_id) {
        return res.json({ error: 'All fields must be required' })
    }
    try {
        const db = await connect()

        const [
            result,
            _,
        ] = await db.query(`SELECT * FROM users WHERE user_id=?`, [user_id])

        return res.json({ User: result })
    } catch (err) {
        console.log(err)
    }
}

const postEditUser = async (req, res) => {
    let { user_id, name, phone_number } = req.body
    if (!user_id || !name || !phone_number) {
        return res.json({ message: 'All fields must be required' })
    } else {
        try {
            const db = await connect()

            const [result, _] = await db.query(
                `
                UPDATE users
                SET
                    name = ?,
                    phone_number = ?
                WHERE
                    user_id = ?
            `,
                [name, phone_number, user_id]
            )

            return res.json({ success: 'User updated successfully' })
        } catch (err) {
            console.log(err)
        }
    }
}

const changePassword = async (req, res) => {
    let { user_id, oldPassword, newPassword } = req.body
    if (!user_id || !oldPassword || !newPassword) {
        return res.json({ message: 'All fields must be required' })
    } else {
        try {
            const db = await connect()

            const [
                result,
                _,
            ] = await db.query(`SELECT * FROM users WHERE user_id=?`, [user_id])

            if (result.length < 1) {
                return res.json({
                    error: 'Invalid user',
                })
            } else {
                const oldPassCheck = await bcrypt.compare(
                    oldPassword,
                    result[0].password
                )
                if (oldPassCheck) {
                    newPassword = bcrypt.hashSync(newPassword, 10)

                    const [result, _] = await db.query(
                        `
                        UPDATE users
                        SET
                            password = ?
                        WHERE
                            user_id = ?
                    `,
                        [newPassword, user_id]
                    )
                    return res.json({
                        success: 'Password updated successfully',
                    })
                } else {
                    return res.json({
                        error: 'Your old password is wrong!!',
                    })
                }
            }
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = {
    getSingleUser,
    postEditUser,
    changePassword,
    // getAllUser,
    // postAddUser,
    // getDeleteUser,
}

// const getDeleteUser = async (req, res) => {
//     let { oId, status } = req.body
//     if (!oId || !status) {
//         return res.json({ message: 'All fields must be required' })
//     } else {
//         let currentUser = userModel.findByIdAndUpdate(oId, {
//             status: status,
//             updatedAt: Date.now(),
//         })
//         currentUser.exec((err, result) => {
//             if (err) console.log(err)
//             return res.json({ success: 'User updated successfully' })
//         })
//     }
// }

// const postAddUser = async (req, res) => {
//     let { allProduct, user, amount, transactionId, address, phone } = req.body
//     if (
// !allProduct ||
// !user ||
// !amount ||
// !transactionId ||
// !address ||
// !phone
//     ) {
//         return res.json({ message: 'All fields must be required' })
//     } else {
//         try {
//             let newUser = new userModel({
//                 allProduct,
//                 user,
//                 amount,
//                 transactionId,
//                 address,
//                 phone,
//             })
//             let save = await newUser.save()
//             if (save) {
//                 return res.json({ success: 'User created successfully' })
//             }
//         } catch (err) {
//             return res.json({ error: error })
//         }
//     }
// }

// const getAllUser = async (req, res) => {
//     try {
//         let Users = await userModel
//             .find({})
//             .populate('allProduct.id', 'pName pImages pPrice')
//             .populate('user', 'name email')
//             .sort({ _id: -1 })
//         if (Users) {
//             return res.json({ Users })
//         }
//     } catch (err) {
//         console.log(err)
//     }
// }s
