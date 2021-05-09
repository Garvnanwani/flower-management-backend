const bcrypt = require('bcryptjs')
const db = require('../config/db')

const getSingleUser = async (req, res) => {
    let { user_id } = req.body

    if (!user_id) {
        return res.json({ error: 'All fields must be required' })
    }
    try {
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
    try {
        if (name && phone_number) {
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
        } else if (name) {
            const [result, _] = await db.query(
                `
                    UPDATE users
                    SET
                        name = ?
                    WHERE
                        user_id = ?
                `,
                [name, user_id]
            )

            return res.json({ success: 'User updated successfully' })
        } else if (phone_number) {
            const [result, _] = await db.query(
                `
                    UPDATE users
                    SET
                        phone_number = ?
                    WHERE
                        user_id = ?
                `,
                [phone_number, user_id]
            )

            return res.json({ success: 'User updated successfully' })
        } else {
            return res.json({ error: 'All fields must be required' })
        }
    } catch (err) {
        console.log(err)
    }
}

const changePassword = async (req, res) => {
    let { user_id, oldPassword, newPassword } = req.body
    if (!user_id || !oldPassword || !newPassword) {
        return res.json({ message: 'All fields must be required' })
    } else {
        try {
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
}
