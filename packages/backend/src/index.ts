import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {client} from './controllers/userController';
import {generators} from "openid-client";

const app = express();
const port = process.env.PORT || 5000;

// Middleware
// Routes
app.use('/api/users', client);

app.get('/login', (req, res) => {
	const nonce = generators.nonce();
	const state = generators.state();


	const authUrl = client.authorizationUrl({
		scope: 'phone openid email',
		state: state,
		nonce: nonce,
	});

	res.redirect(authUrl);
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});