import {GetCommand, PutCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/config/dbConfig";
import { UserData, RoomData} from "@/types/dbTypes";

export const createUser = async (data: UserData) => {
	try {
		const params = {
			TableName: 'users',
			Item: data
		};
		await docClient.send(new PutCommand(params));
		console.log("User added successfully");
	} catch (error) {
		console.error("Error adding user:", error);
		throw error;
	}
};

export const createRoom = async (data: RoomData) => {
	try {
		const params = {
			TableName: 'users',
			Item: data
		};
		await docClient.send(new PutCommand(params));
		console.log("Room added successfully");
	} catch (error) {
		console.error("Error adding room:", error);
		throw error;
	}
};

export const getUser = async (pk: string, sk: string) => {
	try {
		const params = {
			TableName: 'users',
			Key: { PK: pk, SK: sk}
		};
		const result = await docClient.send(new GetCommand(params));
		return result.Item;
	} catch (error) {
		console.error("Error retrieving user:", error);
		throw error;
	}
};


export const getRoom = async (pk: string, sk: string) => {
	try {
		const params = {
			TableName: 'users',
			Key: { PK: pk, SK: sk}
		};
		const result = await docClient.send(new GetCommand(params));
		return result.Item;
	} catch (error) {
		console.error("Error retrieving room:", error);
		throw error;
	}
};

export const updateUser = async (pk: string, sk: string, email: string, password: string) => {
	try {
		const params = {
			TableName: 'users',
			Key: { PK: pk, SK: sk},
			UpdateExpression: "set email = :email, password = :password",
			ExpressionAttributeValues: {
				":email": email,
				":password": password
			},
			ReturnValues: "UPDATED_NEW"
		};
		// @ts-ignore
		const result = await docClient.send(new UpdateCommand(params));
		console.log("User updated successfully:", result);
		return result.Attributes;
	} catch (error) {
		console.error("Error updating user:", error);
		throw error;
	}
};


export const deleteUser = async (pk: string, sk: string) => {
	try {
		const params = {
			TableName: 'users',
			Key: { PK: pk, SK: sk}
			}

		const result = await docClient.send(new DeleteCommand(params));
		console.error(`User ${pk} successfully deleted.`);
	} catch (error) {
		console.error("Error deleting item:", error);
		throw error;
	}
};