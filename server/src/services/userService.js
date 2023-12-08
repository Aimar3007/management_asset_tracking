const { getAllUserRepository } = require('../repositories/userRepository')

const getAllUserService = (reqPagination) => {
    return getAllUserRepository(reqPagination);
}

module.exports = {getAllUserService}