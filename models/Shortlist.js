const {Schema, model} = require('mongoose')

const schema = new Schema({
	uid: {type: String, required: true},
	name: {type: String, required: true},
	nation: {type: String},
	ca: {type: Number},
	pa: {type: Number},
	preferredfoot: {type: String},
	age: {type: Number},
	position: {type: String},
	height: {type: String},
	weight: {type: String},
	wpneeded: {type: String},
	price: {type: Number},
	status: {type: String},
	club: {type: String},
	lth: {type: Number},
	lon: {type: Number},
	dri: {type: Number},
	fin: {type: Number},
	hea: {type: Number},
	fre: {type: Number},
	cro: {type: Number},
	mar: {type: Number},
	tck: {type: Number},
	pas: {type: Number},
	pen: {type: Number},
	fir: {type: Number},
	tec: {type: Number},
	cor: {type: Number},
	agg: {type: Number},
	vis: {type: Number},
	pos: {type: Number},
	otb: {type: Number},
	fla: {type: Number},
	ant: {type: Number},
	tea: {type: Number},
	cnt: {type: Number},
	ldr: {type: Number},
	dec: {type: Number},
	wor: {type: Number},
	det: {type: Number},
	cmp: {type: Number},
	bra: {type: Number},
	sta: {type: Number},
	jum: {type: Number},
	bal: {type: Number},
	agi: {type: Number},
	nat: {type: Number},
	str: {type: Number},
	pac: {type: Number},
	acc: {type: Number},
	amb: {type: Number},
	impm: {type: Number},
	prof: {type: Number},
	injpr: {type: Number},
	cons: {type: Number},
	thr: {type: Number},
	com: {type: Number},
	kic: {type: Number},
	cmd: {type: Number},
	tro: {type: Number},
	han: {type: Number},
	ovo: {type: Number},
	pun: {type: Number},
	pasgk: {type: Number},
	firgk: {type: Number},
	ref: {type: Number},
	aer: {type: Number},
	ecc: {type: Number}
})

module.exports = model('Shortlist', schema)