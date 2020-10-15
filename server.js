const express = require('express')
const mongoose = require('mongoose')
const server = express()
const path = require('path')
require('dotenv/config')

const PORT = process.env.PORT || 5000
const routes = require('./routes/api')
const authRoutes = require('./routes/auth')

async function start(){
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
 			useUnifiedTopology: true,
 			useCreateIndex: true
		})
				// Data parsing

		server.use(express.json());
		server.use(express.urlencoded({ extended: false }));
		
		server.use('/auth', authRoutes)
		server.use('/api', routes)

		if (process.env.NODE_ENV === 'production') {
			server.use(express.static(path.join(__dirname, '/client/build')));
			server.get('*', (req, res) => {
				res.sendFile(path.join(__dirname + '/client/build/index.html'));
		});
		}
		
		server.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
	} catch (e) {
		console.log("Server Error", e.message)
		process.exit(1)
	}
}

start()
