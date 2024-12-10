

import dotenv from 'dotenv';
import {Request, Response, NextFunction} from "express";
import {CustomRequest} from "@/types/authTypes";

dotenv.config();

export const checkAuth = (req: CustomRequest, res: Response, next: NextFunction): void => {
	if (!req.session.userInfo) {
		req.isAuthenticated = false;
	} else {
		req.isAuthenticated = true;
	}
	next();
};

export function getPathFromURL(urlString: string): string | null {
	try {
		const url = new URL(urlString);
		return url.pathname;
	} catch (error) {
		console.error('Invalid URL:', error);
		return null;
	}
}