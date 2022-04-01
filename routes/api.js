const {Router} = require('express')
const router = Router()
const path = require('path')
const User = require('../models/User') // модель пользователя
const Player = require('../models/Player') // модель игрока
const Shortlist= require('../models/Shortlist') // модель бида
const Transferlist= require('../models/Transferlist') // модель бида
const Squadlist = require('../models/Squadlist')  // модель игрока состава
const discordSendMessage = require('../middleware/discordSendMessage') // функция отправки сообщения в дискорд

/* -------------------------------------- */
/* Возвращает список всех игроков в базе */
/* ------------------------------------ */
router.get('/load', (req, res) => {
		Transferlist.find({ })
				.then((data) => {
						res.json(data);
				})
				.catch((error) => {
						console.log('error: ', error);
				});
})

/* ------------------------------------------------------------------ */
/* Возвращает список игроков из команды авторизованного пользователя */
/* ---------------------------------------------------------------- */
router.get('/loadsquad', (req, res) => {
		/* query { club: clubName } */
		Squadlist.find(req.query)
				.then((data) => {
						res.json(data);
				})
				.catch((error) => {
						console.log('error: ', error);
				});
})

/* ------------------------------------------------------ */
/* Возвращает список игроков клуба добавленных в шортлист */
/* ------------------------------------------------------ */
router.get('/loadbid', (req, res) => {
		/* query { club: clubName } */
		Shortlist.find(req.query)
				.then((data) => {
						res.json(data);
				})
				.catch((error) => {
						console.log('error: ', error);
				});
})

/* ----------------------------------- */
/*     Добавление игрока в шортлист    */
/* ----------------------------------- */
router.post('/shortlistadd', async (req, res) => {
	const data = req.body
	const newShortPlayer = await Shortlist.create(data)
	res.json(newShortPlayer)
})

/* ----------------------------------- */
/*     Удаление игрока из шортлиста    */
/* ----------------------------------- */
router.post('/shortlistremove', (req, res) => {
	const filter = req.query
	Shortlist.deleteOne(filter, (err, doc) => {
		if (err) {
			res.status(500).json({ msg: 'Sorry, internal server errors' });
			return; 
		}
		res.json(doc)
	 })
})

/* ------------------------- */
/*     Отчисление игрока    */
/* ----------------------- */
router.get('/sellsquadplayer', (req, res) => {
	const uid = req.query.uid
	Squadlist.find(
		{uid: {$nin: uid}, club: req.query.club},
			(error, doc) => {
				if (error) {
					res.status(500).json({ msg: 'Sorry, internal server errors' });
					return; 
				}
				return res.json(doc);
			}
	);
});            

/* ------------------------------------- */
/*     Обновляет деньги пользователя    */
/* ----------------------------------- */
router.post('/changeuser', (req, res) => {
	const data = req.body
	const filter = req.query
	const options = {new: true, useFindAndModify: false}

	User.findOneAndUpdate(filter,  {$inc: {money: Number(data.money)}}, options,
		(error, doc) => {
			if (error) {
				res.status(500).json({ msg: 'Sorry, internal server errors' });
				return; 
			}
			return res.json(doc.money); /* Возвращает только количество денег */
		})  			
})

router.post('/setbidstatus', (req, res) => {
	const data = req.body
	const filter = req.query
	const options = {new: true, useFindAndModify: false}

	Player.findOneAndUpdate(
		filter, {$set: data}, options, 
		(error, doc) => {
			if (error) {
				res.status(500).json({ msg: 'Sorry, internal server errors' });
				return; 
			}
			return res.json(doc);
		}
	);
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

module.exports = router
