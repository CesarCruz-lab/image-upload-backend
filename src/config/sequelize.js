const Sequelize = require('sequelize');

const {
	DB_DIALECT,
	DB_HOST,
	DB_PORT,
	DB_NAME,
	DB_USERNAME,
	DB_PASSWORD
} = process.env;

const dbConnect = {
	dialect: DB_DIALECT,
	host: DB_HOST,
	port: DB_PORT,
	database: DB_NAME,
	username: DB_USERNAME,
	password: DB_PASSWORD
};

const sequelize = new Sequelize(dbConnect);

module.exports = { sequelize, Sequelize };
