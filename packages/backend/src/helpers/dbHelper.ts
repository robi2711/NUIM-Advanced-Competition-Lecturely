import {GetCommand, PutCommand, DeleteCommand, } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/config/dbConfig";
import { ItemData, RoomData} from "@/types/dbTypes";

export const createUser = async (data: ItemData) => {
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

export const getItem = async (pk: string, sk: string, email: string, password: string) => {
	try {
		const params = {
			TableName: 'users',
			Key: { PK: pk, SK: sk, email: email, password: password}
		};
		const result = await docClient.send(new GetCommand(params));
		return result.Item;
	} catch (error) {
		console.error("Error retrieving item:", error);
	}
};

export const deleteItem = async (pk: string, sk: string) => {
	try {
		const params = {
			TableName: 'users',
			Key: { PK: pk, SK: sk}
			}

		const result = await docClient.send(new DeleteCommand(params));
		console.error(`item ${ pk } successfully deleted.`);
	} catch (error) {
		console.error("Error deleting item:", error);
	}
};