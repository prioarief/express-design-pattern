require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const v1Router = require('./app/v1/routes');
const error_handler = require('./app/v1/helpers/error_handler');
const knex = require('./configs/database');
const logger = require('./configs/logger');

const app = express();

const { APP_PORT = 2000 } = process.env;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('[:status] :method :url :body'));
morgan.token('body', (req) => JSON.stringify(req.body));

// Route
app.use('/api/v1', v1Router);

app.use(error_handler);

app.get('*', (_, res) =>
  res.status(404).json({
    code: 0,
    message: 'not found',
  })
);

app.listen(APP_PORT, () => {
  knex
    .raw('SELECT 1')
    .then(() => {
      logger.info(`Database Connected`);
    })
    .catch((e) => {
      logger.error(`Failed to connect database: ${e.stack}`);
    });
  logger.info(`Server Running On Port ${APP_PORT}`);
});
