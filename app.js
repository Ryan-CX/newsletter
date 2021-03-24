const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
	const fName = req.body.fName;
	const lName = req.body.lName;
	const email = req.body.email;
	console.log(fName, lName, email);
});

app.listen(port, () => {
	console.log(`Server is running at ${port}`);
});
