const jwt = require('../lib/jsonwebtoken')
const {SECRET} = require('../constants')

exports.authentication = async (req, res, next) => {
    const token = req.header('X-Authorization')

    if (!token) {
        next()
        return
    }

    try {
        const decodedToken = await jwt.verify(token, SECRET)

        req.user = decodedToken
        req.app.locals.isAuthenticated = true
        req.app.locals.user = decodedToken
        next()
    } catch (e) {
        req.app.locals.isAuthenticated = false
        req.app.locals.user = null
        res.clearCookie('auth')
        res.status(401).send({
            error: {
                message: 'Not authorized'
            }
        })
    }
}

exports.isAuth = async (req, res, next) => {
    console.log(123213)
    if (!req.user) {
        res.status(401).send({
            error: {
                message: 'Not authorized'
            }
        })

        return
    }

    next()
}

exports.isGuest = async (req, res, next) => {
    if (req.user) {
        res.status(401).send({
            error: {
                message: 'Invalid command'
            }
        })

        return
    }

    next()
}
