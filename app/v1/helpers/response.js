// const sentry = require('../config/sentry')

module.exports = (res, statusCode, message, paginate, result) => {
  const response = {
    code: statusCode === 200 || statusCode === 201 ? 1 : 0,
    message: message,
  }

  if (paginate != null) {
    response.current_page = paginate?.currentPage || paginate?.current_page || 1
    response.total_page = paginate?.totalPage || paginate?.total_page || 1
    response.total_data = paginate?.totalData || paginate?.total_data || 0
  }

  if (result !== null) {
    if (response.code === 1) {
      response.data = result
    } else {
      response.error = result
    }
  }

  res.status(statusCode).json(response)
}
