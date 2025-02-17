import express, {Response} from "express";
import {generators} from "openid-client";
import {CustomRequest} from "@/types/authTypes";
import {client} from "@/config/cognitoConfig";
import { signUpUser, signInUser, signOutUser} from "@/helpers/authHelper";


interface IUserController {
	login: express.Handler,
	logout: express.Handler,
	callback: express.Handler,
	signUp: express.Handler,
	signIn: express.Handler
	signOut: express.Handler
}

const authController: IUserController = {

	login: async (req: CustomRequest, res: Response) => {
		const nonce = generators.nonce();
		const state = generators.state();

		req.session.nonce = nonce;
		req.session.state = state;
		await new Promise(resolve => req.session.save(resolve));
		const authUrl = client.authorizationUrl({
			redirect_uri: 'http://localhost:3000/Lecturely',
			scope: 'openid',
			state: state,
			nonce: nonce,
		});
		res.redirect(authUrl);
	},

	callback: async (req: CustomRequest, res: Response) => {

		try {

			const tokenSet = await client.callback(
				'http://localhost:3000/Lecturely',
				client.callbackParams(req),
				{
					nonce: req.session.nonce,
					state: req.session.state
				}
			);

			if (tokenSet.access_token) {
				const userInfo = await client.userinfo(tokenSet.access_token);
				req.session.userInfo = userInfo;
				req.isAuthenticated = true;
				res.json(userInfo);
			}

		} catch (err) {
			console.error('Callback error:', err);
		}
	},

	signUp: async (req: CustomRequest, res: Response) => {
		const Email = req.body.Email;
		const DisplayName = req.body.Username;
		const Password = req.body.Password
		try {
			const response = await signUpUser(DisplayName, Password, Email);
			res.send(response);
		} catch (error : any) {
			console.error('Error signing up user IN CONTROLLER:', error);
			res.status(500).send('Error signing up user');
		}
	},


	signIn: async (req: CustomRequest, res: Response) => {
		const Email = req.body.Email;
		const Password = req.body.Password
		try {
			const response = await signInUser(Password, Email);
			res.send(response);
		} catch (error) {
			console.error('Error signing in user IN CONTROLLER:', error);
			res.status(500).send('Error signing in user');
		}
	},

	signOut: async (req: CustomRequest, res: Response) => {
		const AccessToken = req.body.AccessToken;
		try {
			const response = await signOutUser(AccessToken);
			res.send(response);
		} catch (error) {
			console.error('Error signing out user IN CONTROLLER:', error);
			res.status(500).send('Error signing out user');
		}
	},

	logout: async (req: CustomRequest, res: Response) => {
		console.log(req.session.state);
		req.session.destroy((err) => {
			if (err) console.error('Session destruction error:', err);
		});
		const logoutUrl = `https://eu-west-1npakczh5l.auth.eu-west-1.amazoncognito.com/logout?client_id=${process.env.COGNITO_CLIENT_ID as string}&logout_uri=http://localhost:3000/`;
		res.redirect(logoutUrl);
	}

};
export default authController;