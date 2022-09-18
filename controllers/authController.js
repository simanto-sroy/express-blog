   /**
    *@imported_models
    */
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const validateErrorFormater = require('../utils/validationErrorFormator');
const Flash = require('../utils/Flash');

   /**
     * Auth Handler Controller
     *  @Exports_Files 
     * SinUpGetController
     * SineUpPostController
     * SineInGetController
     * SineInPostController
     * SineOutController
     */

   /**
    * @SineUpController
    */
exports.SineUpGetController = (req, res, next) => {
    res.render('pages/auth/sineup',
        {
            title: 'Create A New Account',
            errors: {},
            value: {},
            flashMessage: Flash.getMessage(req)
        })
}

exports.SineUpPostController = async (req, res, next) => {

    let { username, email, password } = req.body

    // Validate SineUp Controller
    let errors = validationResult(req).formatWith(validateErrorFormater)

    if (!errors.isEmpty()) {
        req.flash('fail', 'Please Enter a valid Information')
        return res.render('pages/auth/sineup',
            {
                title: 'Please Provide Valid Information',
                errors: errors.mapped(),
                value: {
                    username, email, password
                },
                flashMessage: Flash.getMessage(req)
            })
    }

    // Insert SineUp Data to Database

    try {
        let hashedPassword = await bcrypt.hash(password, 11)

        const user = new User({
            username, email, password:hashedPassword
        })
            
        await user.save()
        req.flash('success', 'Your Account Created Successfully')
        res.redirect('/auth/sinein')
    }
    catch (err) {
        console.log(err)
        next(err)
    }
}


    /**
    * @SineInController
    */
exports.SineInGetController = (req, res, next) => {
    res.render('pages/auth/sinein',
        {
            title: 'Sine In Your Account',
            errors: {},
            flashMessage: Flash.getMessage(req)
        })
}

exports.SineInPostController = async (req, res, next) => {
    let { email, password } = req.body

    // Validate Sine In Account
    let errors = validationResult(req).formatWith(validateErrorFormater)

    if (!errors.isEmpty()) {
        req.flash('fail', 'Please Enter a valid Information')
        return res.render('pages/auth/sinein',
        {
            title: 'Please Provide Valid Information',
            errors: errors.mapped(),
            flashMessage: Flash.getMessage(req)
        })
    }
    

    try {
        // Sine In Account
        let user = await User.findOne({ email })
        if (!user) {
            req.flash('fail', 'Please Enter a valid Information')
            return res.render('pages/auth/sinein',
                {
                    title: 'Please Provide Valid Information',
                    errors: errors.mapped(),
                    flashMessage: Flash.getMessage(req)
                })
        }
        
        let matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            req.flash('fail', 'Please Enter a valid Information')
            return res.render('pages/auth/sinein',
                {
                    title: 'Please Provide Valid Information',
                    errors: errors.mapped(),
                    flashMessage: Flash.getMessage(req)
                })
        }
        req.session.isSineIn = true
        req.session.user = user
        req.session.save(err => {
            if (err) {
                console.log(err)
                return next(err)
            }
            req.flash('success', 'Sine In Successfully Completed')
            return res.redirect('/dashboard')
        })
        
    } catch (e) {
        console.log(e)
        next(e)
    }
 }

 
    /**
    * @SineOutController
    */
exports.SineOutController = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
            return next(err)
        }
        return res.redirect('/auth/sinein')
    })
}
