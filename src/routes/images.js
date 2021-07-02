const route = require('express').Router();

const upload = require('../config/multer');
const FileService = require('../services/Files');

// GET

route.get('/all', async (req, res) => {
	const response = await FileService.find();
	res.json(response);
});

route.get('/search/:id', async (req, res) => {
	const id = req.params.id;
	const response = await FileService.find({ where: { id } });
	
	res.json(response);
});


// POST

route.post('/upload', upload.single('file'), async (req, res) => {
	const data = req.file;
	const response = await FileService.save(data);
	
	res.json(response);
});


// DELETE

route.delete('/remove/:key', async (req, res) => {
	const key = req.params.key;
	const response = await FileService.deleteFile(key);
	
	res.json(response);
});

module.exports = route;
