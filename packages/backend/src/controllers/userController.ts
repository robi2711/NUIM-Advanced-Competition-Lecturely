import {Issuer} from "openid-client";

const issuer = await Issuer.discover('https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_nPakcZH5L');
export const client = new issuer.Client({
	client_id: '30g27l7qmfprhjgc11hfvlnhl1',
	client_secret: '<client secret>',
	redirect_uris: ['https://d84l1y8p4kdic.cloudfront.net'],
	response_types: ['code']
});