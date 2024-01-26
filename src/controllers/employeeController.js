const employeeService = require('../services/employeeService');

const getAllEmployees = (req, res) => {
    try {
        const { query } = req;
        const allEmployees = employeeService.getAllEmployees(query);
        res.send({ status: "OK", data: allEmployees });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOneEmployee = (req, res) => {
    const {
        params: { employeeId },
    } = req;
    if (!employeeId) { 
        res 
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':employeeId' can not be empty" }
            });
    }
    try {
        const employee = employeeService.getOneEmployee(employeeId);
        res.send({ status: "OK", data: employee});
    } catch (error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createNewEmployee = (req, res) => {
    const { body } = req;
    if (
        !body.name ||
        !body.lastname ||
        !body.position ||
        !body.skills ||
        !body.email ||
        !body.address ||
        !body.startDate ||
        !body.department ||
        !body.salary
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "One of the following keys is missing or is empty in request body: 'name', 'lastname', 'position', 'skills', 'email', 'address', 'startDate', 'department', 'salary'" }
            });
        return;
    }

    const newEmployee = {
        name: body.name,
        lastname: body.lastname,
        position: body.position,
        skills: body.skills,
        email: body.email,
        address: body.address,
        startDate: body.startDate,
        department: body.department,
        salary: body.salary,
    }
    try {
        const createEmployee = employeeService.createNewEmployee(newEmployee);
        res.status(201).send({ status: "OK", data: createEmployee });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateOneEmployee = (req, res) => {
    const { body, params: { employeeId} } = req;
    if ( !employeeId ) { 
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':employeeId' can not be empty" },
            });
    }
    try {
        const updateEmployee = employeeService.updateOneEmployee(employeeId, body);
        res.send({ status: "OK", data: updateEmployee});
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteOneEmployee = (req, res) => {
    const { params: { employeeId }} = req;
    if ( !employeeId ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "Parameter ':employeeId' can not be empty" },
            });
    }
    try {
        employeeService.deleteOneEmployee(employeeId);
        res.status(204).send({ status: "OK" });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    getAllEmployees,
    getOneEmployee,
    createNewEmployee,
    updateOneEmployee,
    deleteOneEmployee,
}
