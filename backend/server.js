require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit if DB connection fails
});

require('./models/user');

const app = express();
app.use(express.json())

const {authRouter} = require('./routes/authenticate')
const {emotionRouter} = require('./routes/emotionRoutes')
const {spotifyRouter} = require('./routes/spotifyRoute')

app.use('/auth', authRouter)
app.use('/emotion', emotionRouter)
app.use('/spotify', spotifyRouter)


app.listen(process.env.PORT, () => console.log(`server running on port ${process.env.PORT}`))