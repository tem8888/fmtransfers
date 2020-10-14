const express = require('express');

const config = require('config');

const mongoose = require('mongoose');

const server = express();

const path = require('path');

const cors = require('cors');

require('dotenv/config');

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }); // Data parsing

    server.use(express.json());
    server.use(express.urlencoded({
      extended: false
    }));
    server.use(cors());
    server.use('/auth', require('../routes/auth'));
    server.use('/api', require('../routes/api'));
    server.use(express.static(path.join(__dirname, '/dist')));
    server.get('*', (req, res) => {
      res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
    server.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();