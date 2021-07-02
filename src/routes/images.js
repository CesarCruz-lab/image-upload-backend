const route = require('express').Router();

const upload = require('../config/multer');


// GET

route.get('/all', upload.single('file'), (req, res) => {
	return res.status(200).json({ message: 'OK' });
});


// POST

route.post('/upload', upload.single('file'), (req, res) => {
	const data = req.file;
	
	return res.status(200).json({ message: 'OK', result: data });
});

module.exports = route;
