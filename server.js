const express = require('express');
const path = require('path');

const app = express();
const PORT = 3030;

app.use(express.static(path.join(process.cwd(), 'build')));
app.get('/*', function (req, res) {
	res.sendFile(path.join(process.cwd(), 'index.html'));
});

app.listen(PORT, () => {
	console.log('Server on port ', PORT);
});