import { Request, Response, NextFunction } from 'express';
import { Client, Issuer } from 'openid-client';

let client: Client;

async function initializeClient(): Promise<void> {
	const issuer = await Issuer.discover('https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_nPakcZH5L');
	client = new issuer.Client({
		client_id: process.env.CLIENT_ID as string,
		client_secret: process.env.CLIENT_SECRET as string,
		redirect_uris: [process.env.REDIRECT_URIS as string],
		response_types: ['code']
	});
}

export const ensureClientInitialized = async (req: Request, res: Response, next: NextFunction) => {
	if (!client) {
		await initializeClient();
	}
	req.client = client;
	next();
};