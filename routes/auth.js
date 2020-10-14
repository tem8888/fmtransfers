const {Router} = require('express')
const router = Router()
const User = require('../models/User') // модель пользователя
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.js') // middleware для проверки авторизации

// @route POST api/auth/login
// @desc Auth user

router.post('/login', async (req, res) => {
	const {nickname, password} = req.body

	//Check fields
	if (!nickname || !password) {
		return res.status(400).json({msg: 'Введите все поля.'})
	}

	User.findOne({nickname})
		.then(user => {
			if(!user) return res.status(400).json({msg: 'Пользователь не найден'})
			//Validate password
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if(!isMatch) return res.status(400).json({msg: 'Неправльный пароль'})

					jwt.sign(
						{id: user.userId},
						process.env.jwtSecret,
						{expiresIn: 7200},
						(err, token) => {
							if (err) throw err
							res.json({
								token,
								user: {
									userId: user.userId,
									nickname: user.nickname,
									club: user.club,
									money: user.money
								}
							})
						}
					)
				})
		})

})
/* ------------------------------------- */

// @route POST api/auth/user
// @desc Get user data

router.get('/user', auth, (req, res) => {
	User.findOne({userId: req.user.id})
		.select('-password')
		.then(user => res.json(user))
})



module.exports = router