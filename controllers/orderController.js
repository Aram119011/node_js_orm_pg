const {bookingOrder} = require('../models/models')
const ApiError = require('../error/ApiError');


class orderItemController {
	async orderItem(req,res) {
		try {
			let StartData = new Date()
			let EndData = new Date()
			const order = await bookingOrder.create({
				userId:req.body.userId,
				menuId:req.body.menuId,
				startData:StartData,
				endData: EndData
			})
			res.status(201).json({
				success: true,
				order
			})
		}catch (e) {
			ApiError.badRequest('not fount')

		}
	}
}


module.exports = new orderItemController()
