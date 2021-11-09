const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/keys')
const db = require('../config/db')

exports.loginCheck = (req, res, next) => {
    try {
        let token = req.headers.token
        token = token.replace('Bearer ', '')
        decode = jwt.verify(token, JWT_SECRET)
        req.userDetails = decode
        next()
    } catch (err) {
        res.json({
            error: 'You must be logged in',
        })
    }
}

exports.isAuth = (req, res, next) => {
    let { loggedInUserId } = req.body
    if (
        !loggedInUserId ||
        !req.userDetails.user_id ||
        loggedInUserId != req.userDetails.user_id
    ) {
        res.status(403).json({ error: 'You are not authenticated' })
    }
    next()
}

exports.isAdmin = async (req, res, next) => {
    const reqUserRole = req.userDetails.role
    try {
        if (reqUserRole === 0) {
            res.status(403).json({ error: 'Access denied' })
        }
        next()
    } catch {
        res.status(404)
    }
}
