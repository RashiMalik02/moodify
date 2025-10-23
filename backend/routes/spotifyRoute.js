const express = require('express')
const {spotifyController} = require('../controllers/spotifyController')

const spotifyRouter = express.Router();

spotifyRouter.get('/playlists/:emotion', spotifyController);

module.exports = {spotifyRouter};