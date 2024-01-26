const express = require('express');
const departmentController = require('../../controllers/departmentController');
const verifyToken = require('../../controllers/verifyToken');

const router = express.Router();

router.get('/', verifyToken, departmentController.getAllDepartments);

router.post('/', verifyToken, departmentController.createNewDepartment);

module.exports = router;
