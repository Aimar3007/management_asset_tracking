const { User } = require("../models");

const getAllUserRepository = (reqPagination) => {
  const data = User.findAndCountAll({
    offset: reqPagination.start,
    limit: reqPagination.limit,
  });
  return data;
};

module.exports = { getAllUserRepository };
