const { v4: uuid } = require('uuid');

const Employee = require('../database/Employee');

const getAllEmployees = (filters) => {
    try {
        const allEmployees = Employee.getAllEmployees(filters);
        return allEmployees;
    } catch (error) {
        throw error;
    }
};

const getOneEmployee = (employeeId) => {
    try {
        const employee = Employee.getOneEmployee(employeeId);
        return employee;
    } catch (error) {
        throw error;
    }
};

const createNewEmployee = (newEmployee) => {
    const employeeToInsert = {
        ...newEmployee,
        id: uuid(),
        createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    };
    try {
        const createdEmployee = Employee.createNewEmployee(employeeToInsert);
        return createdEmployee;
    } catch (error) {
        throw error;
    }
};

const updateOneEmployee = (employeeId, changes) => {
    try {
        const updateEmployee = Employee.updateOneEmployee(employeeId, changes);
        return updateEmployee;
    } catch (error) {
        throw error;
    }
};

const deleteOneEmployee = (employeeId) => {
    try {
        Employee.deleteOneEmployee(employeeId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllEmployees,
    getOneEmployee,
    createNewEmployee,
    updateOneEmployee,
    deleteOneEmployee,
};
