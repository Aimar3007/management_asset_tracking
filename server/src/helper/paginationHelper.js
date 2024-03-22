const paginationHelper = (getData) => {
  const { count, reqPagination } = getData;

  const meta = {
    totalPage: Math.ceil(count / reqPagination.limit),
    indexStart: (reqPagination.page - 1) * reqPagination.limit + 1,
    indexEnd: Math.min(reqPagination.page * reqPagination.limit, count),
    perPage: reqPagination.limit,
    currentPage: reqPagination.page,
    totalItems: count,
  };

  return meta;
};

module.exports = paginationHelper;
