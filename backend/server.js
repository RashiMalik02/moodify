const express = require('express');
const mongoose = require('mongoose');
require('./models/user');

const app = express();
app.use(express.json())

const {authRouter} = require('./routes/authenticate')
const {emotionRouter} = require('./routes/emotionRoutes')

app.use('/auth', authRouter)
app.use('/emotion', emotionRouter)

app.listen(3000)