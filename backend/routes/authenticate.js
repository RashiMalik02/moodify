const express = require('express')
const { signUserUp, userLogin } = require('../controllers/authController');


const authRouter = express.Router();

authRouter.post('/register', signUserUp);
authRouter.post('/login', userLogin);

module.exports = { authRouter };