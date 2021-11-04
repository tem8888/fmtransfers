const {Router} = require('express')
const router = Router()
const path = require('path')
const User = require('../models/User') // модель пользователя
const Player = require('../models/Player') // модель игрока
const Bid = require('../models/Bid') // модель бида
const Squadplayer = require('../models/Squadplayer')  // модель игрока состава
const discordSendMessage = require('../middleware/discordSendMessage') // функция отправки сообщения в дискорд
const INTERVALSERVERPOLL = 45000 // интервал опроса

/* ------------------------------------------------------------ */
/* Каждые N секунд проверяем базу на наличие завершенных бидов */
/* ---------------------------------------------------------- */
setInterval(() => {
    let timeNow = new Date()
    Bid.find({})
    .then((data) => {
        data.map((bid) => {

            if ((new Date(bid.dateEnd) - timeNow < 0) && (bid.bidStatus !== 'finished'))
            {
							Bid.findOneAndUpdate({bidId: bid.bidId}, {bidStatus: 'finished'}, {new: true, useFindAndModify: false})
							.then((res) => {
									discordSendMessage(res, 'finished')
									
							})
							.catch((error) => console.log(error))	

							Player.findOneAndUpdate({uid: bid.bidId}, {bidStatus: 'finished'}, {new: true, useFindAndModify: false})
							.then((res) => {
								console.log('Player status updated.')
							})
							.catch((error) => console.log(error))	
            }
        })
    })
    .catch((error) => { console.log('error: ', error) });
}, INTERVALSERVERPOLL);

/* -------------------------------------- */
/* Возвращает список всех игроков в базе */
/* ------------------------------------ */
router.get('/load', (req, res) => {
		Player.find({ })
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
		Squadplayer.find(req.query)
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
		Bid.find({  })
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

/* ------------------------- */
/*     Отчисление игрока    */
/* ----------------------- */
router.get('/sellsquadplayer', (req, res) => {
		const uid = req.query.uid
		Squadplayer.find(
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
