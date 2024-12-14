import {GetCommand, PutCommand} from "@aws-sdk/lib-dynamodb";
import { docClient } from "@/config/dbConfig";
import { ItemData } from "@/types/dbTypes";

export const addItem = async (data: ItemData) => {
	try {
		const params = {
			TableName: data.TableName,
			Item: data.itemAttributes
		};
		await docClient.send(new PutCommand(params));
		console.log("Item added successfully");
	} catch (error) {
		console.error("Error adding item:", error);
		throw error;
	}
};

export const getItem = async (data:ItemData) => {
	try {
		const params = {
			TableName: data.TableName,
			Key: { PK: data.itemAttributes.PK, SK: data.itemAttributes.SK }
		};
		const result = await docClient.send(new GetCommand(params));
		return result.Item;
	} catch (error) {
		console.error("Error retrieving item:", error);
	}
};