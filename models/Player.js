const {Schema, model} = require('mongoose')

const schema = new Schema({
	uid: {type: String, required: true},
	name: {type: String, required: true},
	nat: {type: String},
	nat2: {type: String},
	ca: {type: Number},
	pa: {type: Number},
	age: {type: Number},
	position: {type: String},
	height: {type: String},
	weight: {type: String},
	preferredfoot: {type: String},
	price: {type: Number, required: true},
	status: {type: String},
	skillsTec: {
		cor: {type: String},
		cro: {type: String},
		dri: {type: String},
		fin: {type: String},
		fir: {type: String},
		fre: {type: String},
		hea: {type: String},
		lon: {type: String},
		lth: {type: String},
		mar: {type: String},
		pas: {type: Number},
		pen: {type: String},
		tck: {type: String},
		tec: {type: String}
	},
	skillsMen: {
		agg: {type: String},
		vis: {type: String},
		pos: {type: String},
		otb: {type: String},
		fla: {type: String},
		ant: {type: String},
		tea: {type: String},
		cnt: {type: String},
		ldr: {type: String},
		dec: {type: String},
		wor: {type: String},
		det: {type: String},
		cmp: {type: String},
		bra: {type: String}
	},
	skillsFys: {
		sta: {type: String},
		jum: {type: String},
		bal: {type: String},
		agi: {type: String},
		nat: {type: String},
		str: {type: String},
		pac: {type: String},
		acc: {type: String}
	},
	skillsHid: {
		amb: {type: String},
		impm: {type: String},
		prof: {type: String},
		injpr: {type: String},
		cons: {type: String}
	},
	skillsGk: {
		thr: {type: String},
		com: {type: String},
		kic: {type: String},
		cmd: {type: String},
		tro: {type: String},
		han: {type: String},
		ovo: {type: String},
		pun: {type: String},
		pas: {type: String},
		fir: {type: String},
		ref: {type: String},
		aer: {type: String},
		ecc: {type: String}
	}
	
})

module.exports = model('Player', schema)