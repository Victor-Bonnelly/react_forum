const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

// ...

router.use('/auth', userController); // Assurez-vous que cela est correctement configuré

// ... 