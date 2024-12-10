import express, {Response} from "express";
import {generators} from "openid-client";
import {CustomRequest} from "@/types/authTypes";


interface IUserController {
	login: express.Handler,
	logout: express.Handler,
	default: express.Handler,
	additional: express.Handler,
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


	additional: async (req, res) => {
		res.json({ message: "additional" });
	},
};
export default authController;