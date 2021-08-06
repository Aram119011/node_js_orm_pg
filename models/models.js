const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	userName:{type: DataTypes.STRING},
	email: {type: DataTypes.STRING, unique: true},
	password: {type: DataTypes.STRING}
})

const Menu = sequelize.define('menu', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: DataTypes.STRING},
	description: {type: DataTypes.STRING},
	price: {type: DataTypes.STRING},
})


const  bookingOrder= sequelize.define('toOrderUser', {
	id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	userId: {type: DataTypes.INTEGER, foreignKey: 'user_fk', targetKey: 'id'},
	menuId: {type: DataTypes.INTEGER, foreignKey: 'menu_fk', targetKey: 'id'},
	startData:{type:DataTypes.DATE},
	endData:{type:DataTypes.DATE}
})


User.hasOne(bookingOrder)
bookingOrder.belongsTo(User)

Menu.hasOne(bookingOrder)
bookingOrder.belongsTo(Menu)



module.exports = {
	User,
	Menu,
	bookingOrder
}
