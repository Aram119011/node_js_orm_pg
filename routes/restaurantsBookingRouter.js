const Router = require('express')
const router = new Router()
const restaurantsBookingController = require('../controllers/restaurantsBookingController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/order', authMiddleware, restaurantsBookingController.bookingCreate)

module.exports = router
