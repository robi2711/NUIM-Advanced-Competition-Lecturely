import {
	AuthFlowType,
	CognitoIdentityProviderClient,
	GetUserCommand,
	InitiateAuthCommand,
	SignUpCommand
} from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({
	region: 'eu-west-1',
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
	}
})

export const signUpUser = async (Username: string, Password: string, Email: string) => {
	const params = {
		ClientId: process.env.COGNITO_CLIENT_ID2 || '',
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
		const response = await client.send(command);
		console.log('User signed up successfully:', response);
	} catch (error) {
		console.error('Error signing up user in CONFIG:', error);
	}
}

export const signInUser = async (Password: string, Email: string) => {
	const params = {
		AuthFlow: "USER_PASSWORD_AUTH" as AuthFlowType,
		ClientId: process.env.COGNITO_CLIENT_ID2 || '',
		AuthParameters: {
			USERNAME: Email,
			PASSWORD: Password,
		}
	}

	try {
		const command = new InitiateAuthCommand(params);
		const response = await client.send(command);
		const userInfo = await getUser(response.AuthenticationResult?.AccessToken as string);
		console.log(response.AuthenticationResult);

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