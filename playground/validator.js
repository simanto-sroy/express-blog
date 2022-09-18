/**
 *@Use Express Validator For Validate System
 */

const router = require('express').Router();
const { check, validationResult } = require('express-validator');

router.get('/validator', (req, res, next) => {
    res.render('playground/validator', {title: 'Validate the Playground'})
})

router.post('/validator',
    [
        check('username')
            .not()
            .isEmpty()
            .withMessage('Username Can not be Empty')
            .isLength({
                max: 15
            })
            .withMessage(`User Name Must Be Getter Than 4 Character`),
        check('email')
            .isEmail()
            .withMessage('Please Provide a Valid Email')
    
    ],
    (req, res, next) => {
        let errors = validationResult(req)
        const formatter = (error) => error.msg
        console.log(errors)
        console.log(errors.formatWith(formatter).mapped())
        res.render('playground/validator', {title: 'Validate Error'})
})

module.exports = router