const User = require('../models/User')

exports.bindUserWithRequest = () => {
    return async (req, res, next) => {
        if (!req.session.isSineIn) {
            return next()
        }

        try {
            let user = await User.findById(req.session.user._id)
            req.user = user
            next()
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

exports.isUnAuthenticated = (req, res, next) => {
    if (!req.session.isSineIn) {
        return res.redirect('/auth/sinein')
    }
    next()
}

exports.isAuthenticated = (req, res, next) => {
    if (req.session.isSineIn) {
        return res.redirect('/dashboard')
    }
    next()
}