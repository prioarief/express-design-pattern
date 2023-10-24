const express = require('express');
const healthCheckRouter = require('./modules/health_check/health_check.route');

const v1Router = express.Router();

v1Router.use('/health-check', healthCheckRouter);

module.exports = v1Router;
