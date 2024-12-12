import { Client, Issuer } from 'openid-client';

export let client: Client;

export async function initializeCognitoClient(): Promise<void> {
	try {
		const issuer = await Issuer.discover('https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_nPakcZH5L');
		client = new issuer.Client({
			client_id: process.env.COGNITO_CLIENT_ID as string,
			client_secret: process.env.COGNITO_CLIENT_SECRET as string,
			redirect_uris: [process.env.COGNITO_REDIRECT_URIS as string],
			response_types: ['code']
		});
	} catch (error) {
		console.error('Error initializing client:', error);
		throw error;
	}
}
