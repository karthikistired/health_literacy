const express = require('express');
const router = express.Router();
const { register, getUsers, login } = require('../controllers/userController');

// Register user
router.post('/register', register);
router.post('/login',login);

// Get all users
router.get('/', getUsers);

module.exports = router;
