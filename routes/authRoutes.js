const express = require('express');
const authcontrollers = require('../controllers/authControllers');

const router = express.Router();

router.post('/login', authcontrollers.login);

module.exports = router;
