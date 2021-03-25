const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const https = require('https');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
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
		auth: 'xcg:fe7cf0ea311bba55da5f9242c3956edb-us10',
	};
	const request = https.request(url, options, (response) => {
		if (response.statusCode === 200) {
			res.send('Successfully Subbed');
		} else {
			res.send('There was an error, try again.');
		}
		response.on('data', (data) => {
			console.log(JSON.parse(data));
		});
	});
	request.write(jsonData);
	request.end();
});

app.listen(port, () => {
	console.log(`Server is running at ${port}`);
});

//fe7cf0ea311bba55da5f9242c3956edb-us10

//a6fa1d8f94
