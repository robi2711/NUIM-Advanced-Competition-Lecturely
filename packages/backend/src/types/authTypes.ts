import {Request} from "express";
import session from "express-session";

export interface UserInfo {
	email?: string;
	[key: string]: any;
}
export interface CustomRequest extends Request {
	isAuthenticated?: boolean;
	session: session.Session & {
		userInfo?: UserInfo;
		nonce?: string;
		state?: string;
	};
}