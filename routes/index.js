const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const restaurantsBookingRouter = require('./restaurantsBookingRouter')
const orderRouter = require('./orderRouter')


router.use('/user', userRouter)
router.use('/booking', restaurantsBookingRouter)
router.use('/item', orderRouter)

module.exports = router
