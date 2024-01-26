const Department = require('../database/Department');

const getAllDepartments = () => {
    try {
        const allDepartments = Department.getAllDepartments();
        return allDepartments;
    } catch (error) {
        throw error;
    }
};

const createNewDepartment = (newDepartment) => {
    const lengthDepartments = getAllDepartments().length;
    const departmentToInsert = {
        ...newDepartment,
        id: lengthDepartments + 1,
        createdAt: new Date().toLocaleString('en-US', { timeZone: "UTC" }),
    };
    try {
        const createdDepartment = Department.createNewDepartment(departmentToInsert);
        return createdDepartment;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllDepartments,
    createNewDepartment,
};
