const {Schema, model} = require('mongoose')

const schema = new Schema({
	bidId: {type: String, required: true},
	userId: {type: String, required: true},
	curPrice: {type: String, required: true},
	nextPrice: {type: String},
	playerName: {type: String},
	club: {type: String},
	date: {type: Date},
	dateEnd: {type: Date},
	bidStatus: {type: String},
	prevBid: {
		userId: {type: String},
		club: {type: String},
		price: {type: String}
	}
})

module.exports = model('Bid', schema)