const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userService = require('../services/userService');

const getAllUsers = (req, res) => {
    try {
        const allUsers = userService.getAllUsers();
        res.send({ status: 'OK', data: allUsers });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
};

const createNewUser = async (req, res) => {
    const { body } = req;
    if (
        !body.name ||
        !body.password 
    ) {
        res
            .status(400)
            .send({
                status: 'FAILED',
                data: { error: 'One of the following keys is missing or is empty in request body: \'name\', \'password\'' }
            });
        return;
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser = {
        name: body.name,
        password: hashedPassword,
    };

    try {
        const createUser = userService.createNewUser(newUser);

        const token = jwt.sign({id: newUser.name}, process.env.SECRET, { expiresIn: 60 * 60 * 24});

        res.status(201).send({ status: 'OK', data: {...createUser, token} });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
};

const userLogin = async (req, res) => {
    const { body } = req;
    try {
        const user = await userService.userLogin(body);
        if ( !user.passwordIsValid ) {
            res 
                .status(401)
                .send({
                    status: 'FAILED',
                    data: { error: 'Token invalid' }
                });
            return;
        }
        const token = jwt.sign({name: user.name}, process.env.SECRET,{ expiresIn: '12h' });
        res.status(200).send({ status: 'OK', data: {name: user.name, token} });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: 'FAILED', data: { error: error?.message || error } });
    }
};

module.exports = {
    getAllUsers,
    createNewUser,
    userLogin,
};
