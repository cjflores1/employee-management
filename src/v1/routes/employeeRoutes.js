const express = require('express');
const employeeController = require('../../controllers/employeeController');
const verifyToken = require('../../controllers/verifyToken');

const router = express.Router();

router.get('/', verifyToken, employeeController.getAllEmployees);

router.get('/:employeeId', verifyToken, employeeController.getOneEmployee);

router.post('/', verifyToken, employeeController.createNewEmployee);

router.put('/:employeeId', verifyToken, employeeController.updateOneEmployee);

router.delete('/:employeeId', verifyToken, employeeController.deleteOneEmployee);

module.exports = router;
