     /**
     * Dashboard Handler Route
     *  @Imports_Files 
     * dashboardController
     */

const router = require('express').Router();
const {
    dashboardController,
    createProfileGetController,
    createProfilePostController,
    editProfileGetController,
    editProfilePostController
} = require('../controllers/dashboardController')
const { isUnAuthenticated} = require('../middlewares/authMiddlewares')


router.get('/', isUnAuthenticated, dashboardController)

router.get('/create-profile', isUnAuthenticated, createProfileGetController)
router.post('/create-profile', isUnAuthenticated, createProfilePostController)

router.get('/edit-profile', isUnAuthenticated, editProfileGetController)
router.post('edit-profile', isUnAuthenticated, editProfilePostController)

module.exports = router