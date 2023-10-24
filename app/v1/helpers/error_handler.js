const response = require('./response');

module.exports = (error, request, res, next) => {
  // axios error handler
  if (error.response) {
    // The client was given an error response (5xx, 4xx)
    error.status = error.response.status;
    error.message =
      error.response?.data?.meta?.message || 'error call another service';
  } else if (error.request) {
    // The client never received a response, and the request was never left
    error.status = 400;
    error.message =
      'The client never received a response, and the request was never left';
  } else if (error.details) {
    error.status = 400;
    error.message = error.details[0].message;
  }

  const status = error.status || 500;

  return response(res, status, error.message);
};
