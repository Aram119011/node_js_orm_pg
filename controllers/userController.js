const ApiError = require('../error/ApiError');
const {User, Basket} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email) => {
	return jwt.sign(
		{id, email},
		process.env.SECRET_KEY,
		{expiresIn: '24h'}
	)
}


class UserController {
	async registration(req, res, next) {
		const {userName, email, password} = req.body
		if (!email || !password) {
			return next(ApiError.badRequest('Incorrect email or password'))
		}
		const candidate = await User.findOne({where: {email}})
		if (candidate) {
			return next(ApiError.badRequest('User with this email already exists'))
		}
		const hashPassword = await bcrypt.hash(password, 5)
		const user = await User.create({email, userName, password: hashPassword})
		res.status(201).json({
			user
		})

	}

	async login(req, res, next) {
		const {email, password} = req.body
		const user = await User.findOne({where: {email}})
		if (!user) {
			return next(ApiError.internal('User is not found'))
		}
		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			return next(ApiError.internal('Invalid password entered'))
		}
		const token = generateJwt(user.id, user.email, user.role)
		return res.json({token})
	}

	async check(req, res) {
		const user = await User.findByPk(req.user.id);
		return res.json({
			success: true,
			user: {
				_id:user.id,
				userName: user.userName,
				email: user.email,
			}

		})
	}
}


module.exports = new UserController()
