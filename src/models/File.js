const { sequelize, Sequelize: db } = require('../config/sequelize');

const model = {
	id: {
		type: db.UUID,
		defaultValue: db.UUIDV4,
		allowNull: false,
		primaryKey: true
	},
	name: db.STRING,
	key: db.STRING,
	size: db.STRING,
	mimetype: db.STRING,
	url: db.TEXT
};

const table = {
	tableName: process.env.SEQUELIZE_TABLENAME
};

const FileModel = sequelize.define(table.tableName, model, table);

module.exports = FileModel;
