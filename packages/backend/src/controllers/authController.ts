import express, {Response} from "express";
import {generators} from "openid-client";
import {CustomRequest} from "@/types/authTypes";
import {client} from "@/config/cognitoConfig";


interface IUserController {
	login: express.Handler,
	logout: express.Handler,
	callback: express.Handler,
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
			scope: 'email openid',
			state: state,
			nonce: nonce,
		});
		console.log(req.session.state)
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
			res.redirect('/');
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