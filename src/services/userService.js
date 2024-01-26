const User = require('../database/User');

const getAllUsers = () => {
    try {
        const allUsers = User.getAllUsers();
        return allUsers;
    } catch (error) {
        throw error;
    }
};

const createNewUser = (newUser) => {
    const UserToInsert = {
        ...newUser,
        createdAt: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
    };
    try {
        const createdUser = User.createNewUser(UserToInsert);
        return createdUser;
    } catch (error) {
        throw error;
    }
};

const userLogin = async (user) => {
    try {
        const validateUser = User.findUser(user.name);
        const passwordIsValid = await User.validatePassword(user.password, validateUser.password);
        return {name: validateUser.name, passwordIsValid};
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllUsers,
    createNewUser,
    userLogin,
};
