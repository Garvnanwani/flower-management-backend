const connect = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')
const { validateEmail, toTitleCase } = require('../config/function')

const isAdmin = async (req, res) => {
    let { loggedInUserId } = req.body
    try {
        const result = await db.query(
            `
            SELECT userRole FROM users WHERE userid = ?
        `,
            [loggedInUserId]
        )

        res.json({ role: result[0] })
    } catch {
        res.status(404)
    }
}

const allUser = async (req, res) => {
    try {
        const db = await connect()

        const result = await db.query(`
            SELECT * FROM users
        `)

        res.json({ users: result[0] })
    } catch {
        res.status(404)
    }
}

/* User Registration/Signup controller  */
const postSignup = async (req, res) => {
    try {
        const db = await connect()

        let { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.json('All fields are neccesary')
        }
        if (name.length < 3 || name.length > 25) {
            return res.json('Name must be 3-25 charecter')
        }
        if (validateEmail(email)) {
            name = toTitleCase(name)
            if (password.length > 255 || password.length < 8) {
                return res.json('Password must be 8 charecter')
            } else {
                // If Email & Number exists in Database then:
                password = bcrypt.hashSync(password, 10)

                const result = await db.query(
                    `
                        SELECT email FROM users WHERE email = ?
                    `,
                    [email]
                )

                if (result[0].length > 0) {
                    return res.json('Email already exists')
                } else {
                    const result = await db.query(
                        `INSERT INTO users
                          (
                            name,
                            email,
                            password
                          )
                          VALUES (
                            ?, ?, ?
                          )`,
                        [name, email, password]
                    )

                    return res.json({
                        success: 'Account create successfully. Please login',
                    })
                }
            }
        } else {
            return res.json({ error })
        }
    } catch (err) {
        console.log(err)
    }
}

/* User Login/Signin controller  */
const postSignin = async (req, res) => {
    let { email, password } = req.body
    if (!email || !password) {
        return res.json({
            error: 'Fields must not be empty',
        })
    }
    try {
        const db = await connect()

        const [
            result,
            _,
        ] = await db.query(`SELECT * FROM users where email = ?`, [email])

        console.log(result)

        if (result.length == 0) {
            return res.json({
                error: 'Invalid email or password',
            })
        } else {
            const user = result[0]
            const login = await bcrypt.compare(password, user.password)
            if (login) {
                const token = jwt.sign(
                    { userid: user.userid, role: user.userRole },
                    JWT_SECRET
                )
                const encode = jwt.verify(token, JWT_SECRET)
                return res.json({
                    token: token,
                    user: encode,
                })
            } else {
                return res.json({
                    error: 'Invalid email or password',
                })
            }
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    allUser,
    postSignup,
    postSignin,
    isAdmin,
}
