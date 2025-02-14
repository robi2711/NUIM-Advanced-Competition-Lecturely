import {GetCommand, PutCommand, DeleteCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/config/dbConfig";
import { ItemData } from "@/types/dbTypes";

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

export const addItem = async (data: ItemData) => {
	try {
		const params = {
			TableName: data.TableName,
			Item: data.itemAttributes,
		};
		await docClient.send(new PutCommand(params));
		console.log("Item added successfully");
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