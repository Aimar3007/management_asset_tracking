const paginationHelper = (countFiltered, reqPagination) => {
  let pagination = {};
  pagination.totalPage = Math.ceil(countFiltered / reqPagination.limit);
  if (reqPagination.end < countFiltered) {
    pagination.next = {
      page: reqPagination.page + 1,
      limit: reqPagination.limit,
    };
  }
  if (reqPagination.start > 0) {
    pagination.prev = {
      page: reqPagination.page - 1,
      limit: reqPagination.limit,
    };
  }
  return pagination;
};
module.exports = paginationHelper;
