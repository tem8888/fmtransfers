const {Schema, model, Types} = require('mongoose')

const schema = new Schema ({
	userId: {type: String, required: true},
	assistId: {type: String, required: true},
	username: {type: String, required: true},
	club: {type: String},
	place: {type: Number},
	currentRound: {type: Number},
	nextRound: {type: Number},
	coeff: {type: Number},
	money: {type: Number},
	players: {type: Number},
	password: {type: String},
})

module.exports = model('User', schema)