    /**
     *@Express_Validator for SineUp
     */

const { body } = require('express-validator');
const User = require('../models/User')

module.exports = [
    body('username')
        .isLength({ min: 4, max: 15 }).withMessage('Username must be between 4 to 15 characters')
        .custom(async username => {
            let userName = await User.findOne({ username })
            if (userName) {
                return Promise.reject('Username Already Exist')
            }
        })
        .trim(),
    body('email')
        .isEmail().withMessage('Please provide a valid email address')
        .custom(async email => {
            let userEmail = await User.findOne({ email })
            if (userEmail) {
                return Promise.reject('Email Already Exist')
            }
        })
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Your Password at least 6 characters')
    ,
    body('confirmPassword')
        .isLength({ min: 6 }).withMessage('Your Password at least 6 characters')
        .custom((confirmPassword, { req }) => {
            if (confirmPassword !== req.body.password) {
                throw new Error('Password does not match')
            }
            return true
        })
]