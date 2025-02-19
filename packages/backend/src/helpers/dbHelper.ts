import {GetCommand, PutCommand, DeleteCommand, UpdateCommand, QueryCommand} from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/config/dbConfig";
import { ItemData, RoomData } from "@/types/dbTypes";

function getCurrentDate(): string {
	const now = new Date();
	return now.toLocaleDateString("en-UK", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}

function generateRoomId(): string {
	const now = new Date();
	const random = Math.floor(Math.random() * 1000);
	return now.getTime() + random.toString();
}

function generatePassword(): string {
	const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const numChars = chars.length;
	let password = "";
	for (let i = 0; i < 4; i++) {
		password += chars.charAt(Math.floor(Math.random() * numChars));
	}
	return password;
}

export const addUser = async (data: ItemData) => {
	try {
		const params = {
			TableName: data.TableName,
			Item: {
				PK: data.itemAttributes.PK,
				SK: data.itemAttributes.SK,
				name: data.itemAttributes.data.username,
				email: data.itemAttributes.data.email,
				rooms: data.itemAttributes.data.rooms,
				roomsOwned: data.itemAttributes.data.roomsOwned,
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
	const roomId = generateRoomId();
	const password = generatePassword();
	try {
		const params = {
			TableName: data.TableName,
			Item: {
				PK: roomId,
				SK: "room",
				NameValue: data.itemAttributes.roomName,
				description: data.itemAttributes.description,
				author: data.itemAttributes.author,
				authorSub: data.itemAttributes.authorSub,
				password: password,
				phraseList: [],
				isActive: true,
				date: getCurrentDate(),
			}
		};
		await docClient.send(new PutCommand(params));
		return roomId;
	} catch (error) {
		console.error("Error adding item:", error);
		throw error;
	}
};

export const queryJoinRoom = async (data: RoomData) => {
	if (!data.itemAttributes.roomName) {
		throw new Error("Room name is required to query a room.");
	}
	try {
		const params = {
			TableName: data.TableName,
			IndexName: "NameValue-PK-index",
			KeyConditionExpression: "NameValue = :NameValue",
			ExpressionAttributeValues: {
				":NameValue": data.itemAttributes.roomName,
			},
		};
		const result = await docClient.send(new QueryCommand(params));
		return result.Items;
	} catch (error) {
		console.error("Error querying items:", error);
	}
}


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