const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const routes = require('./routes/');
const { sequelize } = require('./config/sequelize');


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));


sequelize.sync()
	.then(() => console.log('Database connected'))
	.catch(err => console.log(err));


app.use('/', routes);

app.use('/images/key/',
	express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);


module.exports = app;
