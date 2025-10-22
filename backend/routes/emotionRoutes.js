const express = require('express')
const {emotionController} = require('../controllers/detectEmotionFromText')

const emotionRouter = express.Router();

emotionRouter.post('/text', emotionController)

module.exports = {emotionRouter};