const DB = require('./db.json');
const { saveToDatabase } = require('./utils');

/**
 * The function `getAllEmployees` filters and returns a list of employees based on the provided
 * filters.
 * @param filters - The `filters` parameter is an object that contains the filter criteria for the
 * employees. The keys of the `filters` object represent the properties of the employees that need to
 * be filtered, and the values represent the desired values for those properties.
 * @returns The function `getAllEmployees` returns an array of employees that match the given filters.
 * If no filters are provided, it returns all employees from the `DB.employees` array.
 */
const getAllEmployees = (filters) => {
    try {
        const keysFilters = Object.keys(filters);
        const employees = DB.employees;
        if (keysFilters.length > 0) {
            const matchedEmployees = [];
            employees.forEach(employee => {
                if (employee[keysFilters[0]].includes(filters[keysFilters[0]]))
                    matchedEmployees.push(employee);
            });
            return matchedEmployees.length > 0
                ? matchedEmployees
                : 'There are not matches with the filter';
        }
        return DB.employees;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

/**
 * The function `getOneEmployee` retrieves an employee from a database based on their ID.
 * @param employeeId - The `employeeId` parameter is the unique identifier of the employee you want to
 * retrieve from the database.
 * @returns The function `getOneEmployee` returns the employee object with the matching `employeeId`
 * from the `DB.employees` array. If no employee is found with the given `employeeId`, the function
 * returns `undefined`.
 */
const getOneEmployee = (employeeId) => {
    try {
        const employee = DB.employees.find(employee => employee.id === employeeId);
        if (!employee) {
            throw {
                status: 400,
                message: `Can't find employee with the id '${employeeId}'`
            };
        }
        return employee;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

/**
 * The function `createNewEmployee` checks if a new employee already exists in the database and adds
 * them if they don't, throwing an error if they do.
 * @param newEmployee - The `newEmployee` parameter is an object that represents the details of a new
 * employee. It typically includes properties such as `name`, `lastname`, and `email`.
 * @returns The function `createNewEmployee` returns the `newEmployee` object if it is successfully
 * added to the `DB.employees` array.
 */
const createNewEmployee = (newEmployee) => {
    try {
        const isAlreadyAdded = DB.employees.findIndex((employee) => {
            employee.name === newEmployee.name &&
                employee.lastname === newEmployee.lastname &&
                employee.email === newEmployee.email;
        }) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Employee with the name '${newEmployee.name}', lastname name '${newEmployee.lastname}' and email name '${newEmployee.email}' already exists`,
            };
        }
        DB.employees.push(newEmployee);
        saveToDatabase(DB);
        return newEmployee;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

/**
 * The function `updateOneEmployee` updates an employee's information in a database, checking for
 * duplicates and handling errors.
 * @param employeeId - The employeeId parameter is the unique identifier of the employee that needs to
 * be updated.
 * @param changes - The `changes` parameter is an object that contains the updated information for the
 * employee. It can have the following properties:
 * @returns The function `updateOneEmployee` returns the updated employee object.
 */
const updateOneEmployee = (employeeId, changes) => {
    try {
        const isAlreadyAdded = DB.employees.findIndex((employee) => {
            employee.name === changes.name &&
                employee.lastname === changes.lastname &&
                employee.email === changes.email;
        }) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `Employee with the name '${changes.name}', lastname '${changes.lastname}' and email '${changes.email}' already exists`,
            };
        }
        const indexForUpdate = DB.employees.findIndex(employee => employee.id === employeeId);
        if (indexForUpdate === -1) {
            throw {
                status: 400,
                message: `Can't find employee with the id '${employeeId}'`,
            };
        }
        const updateEmployee = {
            ...DB.employees[indexForUpdate],
            ...changes,
            updatedAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
        };
        DB.employees[indexForUpdate] = updateEmployee;
        saveToDatabase(DB);
        return updateEmployee;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

/**
 * The function `deleteOneEmployee` deletes an employee from the database based on their ID.
 * @param employeeId - The employeeId parameter is the unique identifier of the employee that needs to
 * be deleted from the database.
 */
const deleteOneEmployee = (employeeId) => {
    try {
        const indexForDeletion = DB.employees.findIndex(employee => employee.id === employeeId);
        if (indexForDeletion === -1) {
            throw {
                status: 400,
                message: `Can't find employee with the id '${employeeId}'`,
            };
        }
        DB.employees.splice(indexForDeletion, 1);
        saveToDatabase(DB);
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = {
    getAllEmployees,
    getOneEmployee,
    createNewEmployee,
    updateOneEmployee,
    deleteOneEmployee,
};
