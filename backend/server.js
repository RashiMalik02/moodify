const express = require('express');
const mongoose = require('mongoose');
require('./models/user');
const { PORT, MONGO_URL } = require('./config');
mongoose.connect(MONGO_URL);

const app = express();
app.use(express.json())

const {authRouter} = require('./routes/authenticate')
const {emotionRouter} = require('./routes/emotionRoutes')
const {spotifyRouter} = require('./routes/spotifyRoute')

app.use('/auth', authRouter)
app.use('/emotion', emotionRouter)
app.use('/spotify', spotifyRouter)


app.listen(PORT, () => console.log(`server running on port ${PORT}`))