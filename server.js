require('dotenv').config();

const app = require('./src/app');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
	console.log(`Server running at http://${HOST}:${PORT}`);
});
