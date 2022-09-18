module.exports = () => {
    return (req, res, next) => {
        res.locals.user = req.user
        res.locals.isSineIn = req.session.isSineIn

        next()
    }
}