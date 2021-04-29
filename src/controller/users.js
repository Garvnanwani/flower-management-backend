const bcrypt = require('bcryptjs')
const connect = require('../config/db')

const getSingleUser = async (req, res) => {
    let { userid } = req.body

    if (!userid) {
        return res.json({ error: 'All filled must be required' })
    }
    try {
        const db = await connect()

        const [result, _] = await db.query(
            `SELECT * FROM users WHERE userid=?`,
            [userid]
        )

        return res.json({ User: result })
    } catch (err) {
        console.log(err)
    }
}

const postEditUser = async (req, res) => {
    let { userid, name } = req.body
    if (!userid || !name) {
        return res.json({ message: 'All filled must be required' })
    } else {
        try {
            const db = await connect()

            const [result, _] = await db.query(
                `
                UPDATE users
                SET
                    name = ?
                WHERE
                    userid = ?;
            `,
                [name, userId]
            )

            return res.json({ success: 'User updated successfully' })
        } catch (err) {
            console.log(err)
        }
    }
}

const changePassword = async (req, res) => {
    let { userid, oldPassword, newPassword } = req.body
    if (!userid || !oldPassword || !newPassword) {
        return res.json({ message: 'All filled must be required' })
    } else {
        try {
            const db = await connect()

            const [
                result,
                _,
            ] = await db.query(`SELECT * FROM users WHERE userid=?`, [userid])

            if (result.length < 1) {
                return res.json({
                    error: 'Invalid user',
                })
            } else {
                const oldPassCheck = await bcrypt.compare(
                    oldPassword,
                    data.password
                )
                if (oldPassCheck) {
                    newPassword = bcrypt.hashSync(newPassword, 10)

                    const [result, _] = await db.query(
                        `
                        UPDATE users
                        SET
                            password = ?
                        WHERE
                            userid = ?;
                    `,
                        [newPassword, userId]
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
    // getAllUser,
    getSingleUser,
    // postAddUser,
    postEditUser,
    // getDeleteUser,
    changePassword,
}

// const getDeleteUser = async (req, res) => {
//     let { oId, status } = req.body
//     if (!oId || !status) {
//         return res.json({ message: 'All filled must be required' })
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
//         return res.json({ message: 'All filled must be required' })
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
