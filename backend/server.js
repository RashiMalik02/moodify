const express = require('express');
const mongoose = require('mongoose');
require('../models/user');

const app = express();
app.use(express.json())

const {authRouter} = require('../routes/authenticate')

app.use('/auth', authRouter)

app.listen(3000)