const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER, DB_PORT } = process.env;

const knex = require('knex')({
	client: 'mysql2',
	connection: {
		host: DB_HOST,
		user: DB_USER,
		password: DB_PASSWORD,
		database: DB_DATABASE,
		dateStrings: true,
		port: DB_PORT
	},
	acquireConnectionTimeout: 1000000,
	debug: process.env.DB_DEBUG || false,
	pool: { min: 0, max: 10, propagateCreateError: false },
});

module.exports = knex;
