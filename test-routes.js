const express = require('express');
const authcontrollers = require('./controllers/authControllers');

console.log('authcontrollers:', authcontrollers);
console.log('authcontrollers.login:', authcontrollers.login);

const router = express.Router();
console.log('router after creation:', typeof router);

router.post('/login', authcontrollers.login);
console.log('router after .post:', Object.keys(router.stack));

console.log('Final router:', router);
