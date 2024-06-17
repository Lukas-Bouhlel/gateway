const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');
const auth = require("../middleware/auth.js");

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', auth, userController.getUserById);

module.exports = router;
