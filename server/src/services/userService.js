const { getAllUserRepository, createUserRepository } = require('../repositories/userRepository')
const bcrypt = require('bcrypt')

const getAllUserService = (reqPagination) => {
    return getAllUserRepository(reqPagination);
}

const createUserService = async (req) => {
    const { userName, password, email, roleId } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    return createUserRepository(userName, email, hashedPassword, roleId)
}

module.exports = { getAllUserService, createUserService }