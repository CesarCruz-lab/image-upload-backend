const routes = require('express').Router();

const images = require('./images');

routes.use('/images', images);

module.exports = routes;
