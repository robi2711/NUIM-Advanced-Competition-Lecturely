import express, {Response} from "express";
import {generators} from "openid-client";
import {CustomRequest} from "@/types/authTypes";
import {client} from "@/config/clientConfig";


interface IUserController {
	login: express.Handler,
	logout: express.Handler,
	default: express.Handler,
	notsure: express.Handler,
}

const authController: IUserController = {


	login: async (req: CustomRequest, res: Response) => {
		const nonce = generators.nonce();
		const state = generators.state();

		req.session.nonce = nonce;
		req.session.state = state;

		const authUrl = client.authorizationUrl({
			scope: 'email openid',
			state: state,
			nonce: nonce,
		});
		console.log(req.session.nonce);
		res.redirect(authUrl);
	},


	logout: async (req: CustomRequest, res: Response) => {
		console.log(req.session.nonce);
		req.session.destroy((err) => {
			if (err) console.error('Session destruction error:', err);
		});
		const logoutUrl = `https://eu-west-1npakczh5l.auth.eu-west-1.amazoncognito.com/logout?client_id=${process.env.COGNIT_CLIENT_ID as string}&logout_uri=http://localhost:3000/`;
		res.redirect(logoutUrl);
	},


	default: async (req: CustomRequest, res: Response) =>
	{
	res.json({
		isAuthenticated: req.isAuthenticated,
		userInfo: req.session.userInfo
	});
	},


	notsure: async (req: CustomRequest, res: Response) => {
		try {
			console.log(req.session.nonce);
			console.log('Callback params:', client.callbackParams(req));
			const params = client.callbackParams(req);
			const tokenSet = await client.callback(
				'http://localhost:3000/Lecturely',
				params,
				{
					nonce: req.session.nonce,
					state: req.session.state
				}
			);

			console.log('Callback token set:', tokenSet);

			if (tokenSet.access_token) {
				const userInfo = await client.userinfo(tokenSet.access_token);
				req.session.userInfo = userInfo;
				console.log('User info:', userInfo);
				res.redirect('http://localhost:3000/');
			} else {
				console.log('No access token', tokenSet);
				console.log(req.session)
				res.redirect('http://localhost:3000/');
			}
		} catch (err) {
			console.error('Callback error:', err);
			res.redirect('http://localhost:3000/');
		}
	}
};
export default authController;