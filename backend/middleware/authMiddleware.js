const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const connectDB = require('../config/db')

const protect = asyncHandler( async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token from the header
            token = req.headers.authorization.split(' ')[1]

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // get the user from the token
            userSearch = await connectDB.promise().query(`SELECT * FROM users WHERE id=?`, decoded.id)

            req.tech = userSearch[0][0]
            next()
        } catch (err) {
            console.log(err);
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Auothrized, no token was provided')
    }
})

module.exports = {protect}