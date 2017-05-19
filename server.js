const express = require('express');
const path = require('path');

const app = express();
const PORT = 3030;

app.use(express.static(path.join(process.cwd(), 'build')));
app.get('/*', function (req, res) {
	console.log(path.join(process.cwd(), 'build', 'index.html'));
	res.sendFile(path.join(process.cwd(), 'build', 'index.html'));
});

app.listen(PORT, () => {
	console.log('Server on port ', PORT);
});