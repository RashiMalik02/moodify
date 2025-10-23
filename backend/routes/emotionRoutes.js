const express = require('express')
const {emotionController} = require('../controllers/detectEmotionFromText')
const {authMiddleware} = require('../middleware/authMiddleware')

const emotionRouter = express.Router();

emotionRouter.post('/text', authMiddleware , emotionController)

module.exports = {emotionRouter};