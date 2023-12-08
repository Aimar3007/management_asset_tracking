const { getAllUserRepository } = require('../repositories/user.repository')

const getAllUserService = (reqPagination) => {
    return getAllUserRepository(reqPagination);
}

module.exports = {getAllUserService}