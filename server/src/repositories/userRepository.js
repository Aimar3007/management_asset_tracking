const { User } = require("../models");

const getAllUserRepository = (reqPagination) => {
  const data = User.findAndCountAll({
    offset: reqPagination.start,
    limit: reqPagination.limit,
  });
  return data;
};

const createUserRepository = (userName, email, password, roleId) => {
  const user = User.create({ userName, email, password, roleId })
  return user
}

const findUserByEmailRepository =  (email) => {
  const x1 =  User.findOne({ where: { email } })
  return x1;
}

module.exports = { getAllUserRepository, createUserRepository, findUserByEmailRepository };
