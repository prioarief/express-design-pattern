const express = require('express')
const HealthCheckController = require('./health_check.controller')
const healthCheckRouter = express.Router()

healthCheckRouter.get('/', HealthCheckController.check)

module.exports = healthCheckRouter