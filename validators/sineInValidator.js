    /** 
     *@Express_Validator for SineIn 
     */

const { body } = require('express-validator');

module.exports = [
    body('email')
        .not().isEmpty().withMessage('Email is required')
    , 
    body('password')
        .not().isEmpty().withMessage('Password is required')
]