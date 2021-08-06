
const {Menu} = require('../models/models')
const ApiError = require('../error/ApiError');

class restaurantsBookingController {
	async bookingCreate(req, res) {
		try{
			const {
				name,
				description,
				price
			} = req.body
			const menu = await Menu.create({
				name,
				description,
				price
			})
			res.status(201).json({
				success:true,
				menu
			})
		} catch (e) {
			ApiError.badRequest('not fount')
		}
	}
}

module.exports = new restaurantsBookingController()
