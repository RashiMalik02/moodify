const express = require('express')
const {spotifyController} = require('../controllers/spotifyController');
const { authMiddleware } = require('../middleware/authMiddleware');

const spotifyRouter = express.Router();

spotifyRouter.get('/playlists/:emotion', authMiddleware , spotifyController);

module.exports = {spotifyRouter};