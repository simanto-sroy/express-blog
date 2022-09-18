const Flash = require('../utils/Flash')
const Profile = require('../models/Profile')

exports.dashboardController = async (req, res, next) => {
    
    try {
        let userProfile = await Profile.findOne({ user: req.user._id })
    
        if (userProfile) {
            return res.render('pages/dashboard/dashboard',
            {
                title: 'My Dashboard',
                flashMessage: Flash.getMessage(req)
            })
        }
        res.redirect('/dashboard/create-profile')
    }
    catch (err) {
        next(err);
    }

}

exports.createProfileGetController = async (req, res, next) => {

    try {
        let profile = await Profile.findOne({ user: req.user._id })

        if (profile) {
            return res.redirect('/dashboard/edit-profile')
        }

        res.render('pages/dashboard/create-profile', { title: 'Create Your Profile', flashMessage: Flash.getMessage(req) })
        
    } catch (err) {
        next(err)
    }
}

exports.createProfilePostController = (req, res, next) => {
    next()
}

exports.editProfileGetController = (req, res, next) => {
    next()
}

exports.editProfilePostController = (req, res, next) => {
    next()
}