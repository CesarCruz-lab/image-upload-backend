const FileModel = require('../models/File');


// READ

async function find(search) {
	const response = {
		message: '',
		result: null
	};
	
	try {
		response.result = await FileModel.findAll(search);
		response.message = 'OK';
		
	} catch (err) {
		response.message = err.message;
	}
	
	return response;
}


// WRITE

async function save(dataFile) {
	const response = {
		message: '',
		result: null
	};
	
	try {
		const { originalname, key, size, mimetype, path } = dataFile;
		const urlName = process.env.STORAGE_TYPE !== 'local'
			? path
			: `${process.env.APP_URL}/images/key/${key}`;
		
		response.result = await FileModel.create({
			name: originalname,
			key,
			size,
			mimetype,
			url: urlName
		});
		
		response.message = 'OK';
		
	} catch (err) {
		response.message = err.message;
	}
	
	return response;
}


// DELETE

async function deleteFile(key) {
	const response = {
		message: '',
		result: null
	};
	
	const clearLocalStorage = () => {
		const fs = require('fs');
		const path = require('path');
		
		fs.unlink(path.resolve(__dirname, '../../tmp/uploads', key), err => {
			response.message = err.errno;
		});
	}
	
	const clearCloudinaryStorage = () => {
		try {
			const ID = publicID.replace(/([\.][\w]+)$/g, '');
			
			cloudinary.uploader.destroy(ID, result => {
				response.result = result;
				response.message = 'Ok';
			});
			
		} catch (err) {
			response.message = err.message;
		}
	}
	
	const methods = {
		local: clearLocalStorage,
		cloudinary: clearCloudinaryStorage
	};
	
	methods[process.env.STORAGE_TYPE]();
	
	const record = await FileModel.destroy({ where: { key } });
	
	response.result = record;
	
	return response;
}

module.exports = {
	find,
	save,
	deleteFile
};
