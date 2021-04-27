const connect = require('../config/db')

export const isAdmin = async (req, res) => {
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

export const allUser = async (req, res) => {
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
export const postSignup = async (req, res) => {
    try {
        const db = await connect()

        let { name, email, password } = req.body
        let error = {}
        if (!name || !email || !password) {
            error = {
                ...error,
                name: 'Field must not be empty',
                email: 'Field must not be empty',
                password: 'Field must not be empty',
            }
            return res.json({ error })
        }
        if (name.length < 3 || name.length > 25) {
            error = { ...error, name: 'Name must be 3-25 charecter' }
            return res.json({ error })
        }
        if (validateEmail(email)) {
            name = toTitleCase(name)
            if (password.length > 255 || password.length < 8) {
                error = {
                    ...error,
                    password: 'Password must be 8 charecter',
                    name: '',
                    email: '',
                }
                return res.json({ error })
            } else {
                // If Email & Number exists in Database then:
                try {
                    password = bcrypt.hashSync(password, 10)

                    const result = await db.query(
                        `
                        SELECT email FROM users WHERE email = ?
                    `,
                        [email]
                    )

                    if (result[0]) {
                        error = {
                            ...error,
                            password: '',
                            name: '',
                            email: 'Email already exists',
                        }
                        return res.json({ error })
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
                            success:
                                'Account create successfully. Please login',
                        })
                    }
                } catch (err) {
                    console.log(err)
                }
            }
        } else {
            error = {
                ...error,
                password: '',
                name: '',
                email: 'Email is not valid',
            }
            return res.json({ error })
        }
    } catch (err) {
        console.log(error)
    }
}

/* User Login/Signin controller  */
export const postSignin = async (req, res) => {
    let { email, password } = req.body
    if (!email || !password) {
        return res.json({
            error: 'Fields must not be empty',
        })
    }
    try {
        const db = await connect()

        const data = await db.query(`SELECT * FROM users where email = ?`, [
            email,
        ])

        if (!data) {
            return res.json({
                error: 'Invalid email or password',
            })
        } else {
            const login = await bcrypt.compare(password, data.password)
            if (login) {
                const token = jwt.sign(
                    { _id: data._id, role: data.userRole },
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
