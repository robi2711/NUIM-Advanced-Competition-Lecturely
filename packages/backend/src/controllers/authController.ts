import express, {Response} from "express";
import {CustomRequest} from "@/types/authTypes";
import { signUpUser, signInUser, signOutUser} from "@/helpers/authHelper";


interface IUserController {
	signUp: express.Handler,
	signIn: express.Handler
	signOut: express.Handler
}

const authController: IUserController = {

	signUp: async (req: CustomRequest, res: Response) => {
		const Email = req.body.Email;
		const DisplayName = req.body.Username;
		const Password = req.body.Password
		try {
			const response = await signUpUser(DisplayName, Password, Email);
			res.send(response);
		} catch (error : any) {
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
			res.status(500).send('Error signing in user');
		}
	},

	signOut: async (req: CustomRequest, res: Response) => {
		const AccessToken = req.body.AccessToken;
		try {
			const response = await signOutUser(AccessToken);
			res.send(response);
		} catch (error) {
			res.status(500).send('Error signing out user');
		}
	},

};
export default authController;