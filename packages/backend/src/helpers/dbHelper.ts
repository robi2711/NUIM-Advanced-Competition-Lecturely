import {GetCommand, PutCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/config/dbConfig";
import { ItemData, RoomData } from "@/types/dbTypes";
import { v4 as uuidv4 } from 'uuid';

function getCurrentDate(): string {
	const now = new Date();
	return now.toLocaleDateString("en-UK", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}

export const addUser = async (data: ItemData) => {
	try {
		const params = {
			TableName: data.TableName,
			Item: {
				PK: data.itemAttributes.PK,
				SK: data.itemAttributes.SK,
				username: data.itemAttributes.data.username,
				email: data.itemAttributes.data.email,
				rooms: data.itemAttributes.data.rooms,
			}
		};
		await docClient.send(new PutCommand(params));
		console.log("Item added successfully");
	} catch (error) {
		console.error("Error adding item:", error);
		throw error;
	}
};

export const addRoom = async (data: RoomData) => {
	try {
		const params = {
			TableName: data.TableName,
			Item: {
				PK: ,
				SK: "room",
				name: data.itemAttributes.name,
				description: data.itemAttributes.description,
				author: data.itemAttributes.author,
				date: getCurrentDate(),
			}
		};
		await docClient.send(new PutCommand(params));
		console.log("Room added successfully");
	} catch (error) {
		console.error("Error adding item:", error);
		throw error;
	}
};

export const getItem = async (data: ItemData) => {
	try {
		const params = {
			TableName: data.TableName,
			Key: {
				PK: data.itemAttributes.PK,
				SK: data.itemAttributes.SK
			}
		};
		const result = await docClient.send(new GetCommand(params));
		return result.Item;
	} catch (error) {
		console.error("Error retrieving user:", error);
	}
};

export const updateItem = async (data: ItemData) => {
	try {
		const params = {
			TableName: data.TableName,
			Key: {
				PK: data.itemAttributes.PK,
				SK: data.itemAttributes.SK,
			},
			UpdateExpression: data.itemAttributes.data.UpdateExpression,
			ExpressionAttributeValues: data.itemAttributes.data.ExpressionAttributeValues,
			ReturnValues: "UPDATED_NEW"
		};
		// @ts-ignore
		const result = await docClient.send(new UpdateCommand(params));
		//console.log("Item updated successfully:", result);
		return result.Attributes;
	} catch (error) {
		console.error("Error updating item:", error);
		throw error;
	}
};


export const deleteItem = async (data: ItemData) => {
	try {
		const params = {
			TableName: data.TableName,
			Key: {
				PK: data.itemAttributes.PK,
				SK: data.itemAttributes.SK,
			}
		};
		const result = await docClient.send(new DeleteCommand(params));
		console.error(`User ${data.itemAttributes.PK} successfully deleted.`);
	} catch (error) {
		console.error("Error deleting item:", error);
		throw error;
	}
};