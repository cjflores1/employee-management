const bcrypt = require('bcrypt');

const usersDB = require('./users.json');
const { saveToDatabase } = require('./utils');

const getAllUsers = () => {
    try {
        return usersDB.users;
    } catch (error) {
        throw { status: 500, message: error };
    }
};

const createNewUser = (newUser) => {
    try {
        const isAlreadyAdded = usersDB.users.findIndex((userDB) => userDB.user === newUser.name ) > -1;
        if (isAlreadyAdded) {
            throw {
                status: 400,
                message: `User with the name '${newUser.name}' already exists`,
            };
        }
        usersDB.users.push(newUser);
        saveToDatabase(usersDB, 'users');
        return {name: newUser.name};
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const findUser = (username) => {
    try {
        const userFound = usersDB.users.find(user => user.name === username);
        if ( !userFound ) {
            throw {
                status: 404,
                message: `The user ${username} does not exists`
            };
        }
        return userFound;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const validatePassword = async (passwordToValidate, passwordValidated) => {
    try {
        const passwordIsValid = await bcrypt.compare(passwordToValidate, passwordValidated);
        return passwordIsValid;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = {
    getAllUsers,
    createNewUser,
    findUser,
    validatePassword,
};
