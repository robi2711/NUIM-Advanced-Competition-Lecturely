import {
	AuthFlowType,
	GetUserCommand, GlobalSignOutCommand,
	InitiateAuthCommand, NotAuthorizedException,
	SignUpCommand, UsernameExistsException
} from "@aws-sdk/client-cognito-identity-provider";

import {client} from "@/config/authConfig";
import dotenv from "dotenv";

dotenv.config();

export const signUpUser = async (Username: string, Password: string, Email: string) => {
	const params = {
		ClientId: process.env.COGNITO_CLIENT_ID || '',
		Username: Email,
		Password: Password,
		UserAttributes: [
			{
				Name: 'given_name',
				Value: Username
			}
		]
	}

	try {
		const command = new SignUpCommand(params);
		const result = await client.send(command);
		return result;
	} catch (error) {
		if (error instanceof UsernameExistsException) {
			return 'Username already exists';
		}
		console.error('Error signing up user in CONFIG:', error);
	}
}

export const signInUser = async (Password: string, Email: string) => {
	const params = {
		AuthFlow: "USER_PASSWORD_AUTH" as AuthFlowType,
		ClientId: process.env.COGNITO_CLIENT_ID || '',
		AuthParameters: {
			USERNAME: Email,
			PASSWORD: Password,
		}
	}

	try {
		const command = new InitiateAuthCommand(params);
		const response = await client.send(command);
		const userInfo = await getUser(response.AuthenticationResult?.AccessToken as string);

		return {
			email: Email,
			sub: userInfo?.UserAttributes?.find((attr) => attr.Name === 'sub')?.Value,
			username: userInfo?.UserAttributes?.find((attr) => attr.Name === 'given_name')?.Value,
			accessToken: response.AuthenticationResult?.AccessToken,
			idToken: response.AuthenticationResult?.IdToken,
			refreshToken: response.AuthenticationResult?.RefreshToken,
			tokenType: response.AuthenticationResult?.TokenType,
		};
	} catch (error) {
		if (error instanceof NotAuthorizedException) {
			return 'Wrong Username or Password';
		}
		console.error('Error Signing In user in CONFIG:', error);
	}
}

export const getUser = async (AccessToken: string) => {
	const params = {
		AccessToken: AccessToken
	}

	try {
		const command = new GetUserCommand(params);
		const response = await client.send(command);
		console.log('User retrieved successfully:', response);
		return response;
	} catch (error) {
		console.error('Error retrieving user in CONFIG:', error);
	}
}

export const signOutUser = async (AccessToken : string) => {
	const params = {
		AccessToken: AccessToken
	}
	try {
		const command = new GlobalSignOutCommand(params);
		const response = await client.send(command);
		console.log('User signed out successfully:', response);
		return response;
	} catch (error) {
		console.error('Error signing out user in CONFIG:', error);
	}
}