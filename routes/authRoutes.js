    /**
     * Auth Handler Route
     *  @Imports_Files 
     * SinUpGetController
     * SineUpPostController
     * SineInGetController
     * SineInPostController
     * SineOutController
     */

const router = require('express').Router();
const sineUpValidator = require('../validators/sineUpValidator')
const sineInValidator = require('../validators/sineInValidator')

const {
    SineUpGetController,
    SineUpPostController,
    SineInGetController,
    SineInPostController,
    SineOutController,
} = require('../controllers/authController')

const { isAuthenticated } = require('../middlewares/authMiddlewares')

    
    /**
     * @SineUpRoutes
     */
router.get('/sineup', isAuthenticated, SineUpGetController);
router.post('/sineup', isAuthenticated, sineUpValidator, SineUpPostController);

    /**
     * @SineInRoutes
     */
router.get('/sinein', isAuthenticated, SineInGetController);
router.post('/sinein', isAuthenticated, sineInValidator, SineInPostController);

    /**
     * @SineOutRoutes
     */
router.get('/sineout', SineOutController);

module.exports = router;