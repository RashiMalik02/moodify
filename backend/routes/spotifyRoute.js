const express = require('express')
const spotifyController = require('../controllers/spotifyController')

const spotifyRouter = express.Router();

spotifyRouter.get('/playlist/:emotion', spotifyController)

module.exports = {spotifyController};