import { Client } from 'openid-client';

declare global {
	namespace Express {
		interface Request {
			client: Client;
		}
	}
}