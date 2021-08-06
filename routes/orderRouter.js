const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')


router.post('/order',  orderController.orderItem)



module.exports = router
