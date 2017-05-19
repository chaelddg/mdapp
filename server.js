const express = require('express');
const path = require('path');

const app = express();
const PORT = 3030;

app.use(express.static('build'));
app.get('/*', function (req, res) {
	console.log(path.join(__dirname, '/build/index.html'));
	res.sendFile(path.join(__dirname, '/build/index.html'));
});

app.listen(PORT, () => {
	console.log('Server on port ', PORT);
});