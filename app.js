const express = require('express');
const app = express();
const port = 3000;

const https = require('https');
require('dotenv').config();
let api = process.env.API;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
	const fName = req.body.fName;
	const lName = req.body.lName;
	const email = req.body.email;
	const data = {
		members: [
			{
				email_address: email,
				status: 'subscribed',
				merge_fields: {
					FNAME: fName,
					LNAME: lName,
				},
			},
		],
	};
	const jsonData = JSON.stringify(data);

	const url = 'https://us10.api.mailchimp.com/lists/3.0/a6fa1d8f94';

	const options = {
		method: 'POST',
		auth: `xcg:${api}`,
	};
	const request = https.request(url, options, (response) => {
		if (response.statusCode === 200) {
			res.send('Successfully Subbed');
		} else {
			res.send('There was an error, try again.');
		}
		response.on('data', (data) => {
			console.log(data);
		});
	});
	request.write(jsonData);
	request.end();
});

app.listen(port, () => {
	console.log(`Server is running at ${port}`);
});
