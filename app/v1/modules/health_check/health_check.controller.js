const knex = require('../../../../configs/database');
const response = require('../../helpers/response');

class HealthCheckController {
  static async check(_, res, next) {
    try {
      const databaseConnection = knex
        .raw('SELECT 1 AS result')
        .then(() => 'Health')
        .catch(() => 'Unhealth');

      const data = {
        database: await databaseConnection,
      };

      return response(res, 200, 'Health Check', null, data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = HealthCheckController;
