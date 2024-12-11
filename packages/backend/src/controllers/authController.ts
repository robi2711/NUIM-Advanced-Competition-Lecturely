import express, {Response} from "express";
import {generators} from "openid-client";
import {CustomRequest} from "@/types/authTypes";


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

		const authUrl = req.client.authorizationUrl({
			scope: 'email openid phone',
			state: state,
			nonce: nonce,
		});
		res.redirect(authUrl);
	},


	logout: async (req: CustomRequest, res: Response) => {
		req.session.destroy((err) => {
			if (err) console.error('Session destruction error:', err);
		});
		const logoutUrl = `https://eu-west-1npakczh5l.auth.eu-west-1.amazoncognito.com/logout?client_id=${process.env.CLIENT_ID as string}&logout_uri=http://localhost:3000/`;
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
			const params = req.client.callbackParams(req);
			const tokenSet = await req.client.callback(
				'http://localhost:3000/Lecturely',
				params,
				{
					nonce: req.session.nonce,
					state: req.session.state
				}
			);
			if (tokenSet.access_token) {
				const userInfo = await req.client.userinfo(tokenSet.access_token);
				req.session.userInfo = userInfo;
				console.log('User info:', userInfo);
				res.redirect(process.env.REDIRECT_URIS as string);
			} else {
				console.log('No access token');
				res.redirect(process.env.REDIRECT_URIS as string);
			}
		} catch (err) {
			console.error('Callback error:', err);
			res.redirect(process.env.REDIRECT_URIS as string);
		}
	}
};
export default authController;