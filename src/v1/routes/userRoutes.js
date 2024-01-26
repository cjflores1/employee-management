const express = require('express');
const userController = require('../../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);

router.post('/', userController.createNewUser);

router.post('/login', userController.userLogin);

module.exports = router;
