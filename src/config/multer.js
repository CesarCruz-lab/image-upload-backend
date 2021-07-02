const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const path = require('path');


// GLOBAL

const getHash = (len=16, min=0, max=16) => {
	const randInt = (min, max) => (Math.floor(Math.random() * (max - min)) + min);
	
	let count = 0;
	let char = '';
	let hash = '';
	
	while (count <= len) {
		char = randInt(min, max).toString(36);
		hash += char;
		count = hash.length;
	};
	
	return hash;
}

const defaultPath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');


// STORAGES

const localStorageConfig = multer.diskStorage({
	destination: (req, file, cb) => cb(null, defaultPath),
	filename: (req, file, cb) => {
		const hash = `${new Date().toISOString()}_${getHash(8)}`;
		
		file.key = `${hash}_${file.originalname}`;
		
		cb(null, file.key);
	},
});

const cloudinaryStorageConfig = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: 'files',
		format: async (req, file) => file.mimetype.replace('image/', ''),
		public_id: (req, file) => {
			const originalname = file.originalname.replace(/[\.][\w]+$/g, '');
			const hash = `${new Date().toISOString()}_${getHash(8)}`;
			
			file.key = `${hash}_${originalname}`;
			
			return file.key;
		}
	}
});


// MULTER

const storageTypes = {
	local: localStorageConfig,
	cloudinary: cloudinaryStorageConfig
};

const fileFilterConfig = (req, file, cb) => {
	const allowedMimes = [
		'image/jpeg',
		'image/pjpeg',
		'image/png',
		'image/gif'
	];
	
	if (allowedMimes.includes(file.mimetype)) cb(null, true);
	else cb({message: 'Unsupported file format'}, null);
};

const multerConfig = {
	dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
	storage: storageTypes[process.env.STORAGE_TYPE],
	limits: { fileSize: 2 * (1024 ** 2) },
	fileFilter: fileFilterConfig
};

module.exports = multer(multerConfig);
