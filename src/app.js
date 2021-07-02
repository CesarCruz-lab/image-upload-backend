const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const routes = require('./routes/');
const { sequelize } = require('./config/sequelize');


const app = express();


sequelize.sync()
	.then(() => console.log('Database connected'))
	.catch(err => console.log(err));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));


app.use('/', routes);


module.exports = app;
