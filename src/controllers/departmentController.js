const departmentService = require('../services/departmentService');

const getAllDepartments = (req, res) => {
    try {
        const allDepartments = departmentService.getAllDepartments();
        res.send({ status: "OK", data: allDepartments });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createNewDepartment = async (req, res) => {
    const { body } = req;
    if (
        !body.name ||
        !body.shortName 
    ) {
        res
            .status(400)
            .send({
                status: "FAILED",
                data: { error: "One of the following keys is missing or is empty in request body: 'name', 'shortName'" }
            });
        return;
    }

    const newDepartment = {
        name: body.name,
        password: body.shortName,
    }

    try {
        const createDepartment = departmentService.createNewDepartment(newDepartment);
        res.status(201).send({ status: "OK", data: createDepartment });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    getAllDepartments,
    createNewDepartment,
}
