const departmentsDB = require('./departments.json');
const { saveToDatabase } = require('./utils');

const getAllDepartments = () => {
    try {
        return departmentsDB.departments;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const createNewDepartment = (newDepartment) => {
    try {
        const isAlreadyAdded = departmentsDB.departments.findIndex((departmentDB) => departmentDB.name === newDepartment.name ) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Department with the name '${newDepartment.name}' already exists`,
            };
        }
        departmentsDB.departments.push(newDepartment);
        saveToDatabase(departmentsDB, 'departments');
        return newDepartment;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = {
    getAllDepartments,
    createNewDepartment,
}
