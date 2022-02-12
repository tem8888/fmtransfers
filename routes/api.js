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

/* ------------------------------------ */
/* Возвращает список всех бидов в базе */
/* ---------------------------------- */
router.get('/loadbid', (req, res) => {
		Shortlist.find(req.query)
				.then((data) => {
						res.json(data);
				})
				.catch((error) => {
						console.log('error: ', error);
				});
})

/* ---------------------------------- */
/* Возвращает, текущий бид на игрока */
/* -------------------------------- */
router.get('/loadcurrentbid', (req, res) => {
		Bid.findOne(req.query)
				.then((data) => {
						res.json(data);
				})
				.catch((error) => {
						console.log('error: ', error);
				});
})

/* ---------------------------------------- */
/* Добавляет или изменяет существующий бид */
/* -------------------------------------- */
router.post('/bidsend', (req, res) => {
	const data = req.body
	const filter = req.query
	const options = {upsert: true, new: true, useFindAndModify: false, rawResult: true}

	Bid.findOne(filter, 
		(error, doc) => {
		if (error) {
				res.status(500).json({ msg: 'Sorry, internal server errors' });
				return 
		}
		if (!doc) { 
			Bid.findOneAndUpdate(
				filter, data, options, 
				(error, doc) => {
						if (error) {
								res.status(500).json({ msg: 'Sorry, internal server errors' });
								return; 
						}
						return res.json(doc);
			})
		}
		else if (Number(data.curPrice) < Number(doc.nextPrice)) /* если присланный бид меньше, чем ожидаемый следующий бид */
			return res.json('toLateError')
		else { 

			/* возвращаем деньги */
			User.findOneAndUpdate({userId: doc.userId},  {$inc: {money: Number(doc.curPrice)}}, options,
			(error) => {
					if (error) {
							res.status(500).json({ msg: 'Sorry, internal server errors' });
							return; 
					}
			})  

			data.prevBid = {userId: doc.userId, club: doc.club, price: doc.curPrice}
			Bid.findOneAndUpdate(
			filter, data, options, 
			(error, doc) => {
					if (error) {
							res.status(500).json({ msg: 'Sorry, internal server errors' });
							return; 
					}
					console.log('это был не первый бид на игрока, но я первее перебил');
					return res.json(doc);
			})}

});
});

/* ----------------------------------- */
/*     Добавление игрока в шортлист    */
/* ----------------------------------- */
router.post('/shortlistupdate', async (req, res) => {
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
				});
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
	 });
});

// If no API routes are hit, send the React app
router.use(function(req, res) {
	res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

module.exports = router
