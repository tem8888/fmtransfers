const {Schema, model, Types} = require('mongoose')

const schema = new Schema ({
	userId: {type: String, required: true},
	nickname: {type: String, required: true},
	club: {type: String},
	money: {type: Number},
	// bidList: {
	// 	uid: {type: String, required: true},
	// 	name: {type: String, required: true},
	// 	nation: {type: String, required: true},
	// 	ca: {type: Number, required: true},
	// 	pa: {type: Number, required: true},
	// 	age: {type: Number, required: true},
	// 	position: {type: String, required: true},
	// 	preferredfoot: {type: String},
	// 	price: {type: Number, required: true}
	// },
	password: {type: String}
})

module.exports = model('User', schema)