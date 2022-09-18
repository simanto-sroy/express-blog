const router = require('express').Router()

const { isUnAuthenticated } = require('../middlewares/authMiddlewares')
const upload = require('../middlewares/uploadMiddleware')

const { uploadProfilePics } = require('../controllers/uploadController')


router.post('/profilePics', isUnAuthenticated, upload.single('profilePics'), uploadProfilePics)

module.exports = router