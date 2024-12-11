import { Request, Response } from 'express';
import { DynamoDBDocumentClient, PutCommand, GetCommand, DeleteCommand, UpdateCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from '../config/dynamo';
import { Rooms } from '../types/type';

export class ItemController {

    async function createItem(item: any) {
    const params = {
        TableName: 'Rooms',
        Item: {
            roomID: '1',
            userID: 'wth332',
            category: 'English',
            content: 'lorem',
            dateCreated: Date.now().toString(),
            dateUpdated: new Date().toISOString()
        },
    };

    try {
        await docClient.send(new PutCommand(params));
            return params.Item;
        }
        catch (error) {
            throw new Error(`Create operation failed: ${error}`);
        }
    }

    async function getItem(id: string) {
        const params = {
            TableName: "YourTableName",
            Key: { id }
        };

        try {
            const response = await docClient.send(new GetCommand(params));
            return response.Item;
        } catch (error) {
            throw new Error(`Read operation failed: ${error}`);
        }
    }

    async function getAllItems() {
        const params = {
            TableName: "YourTableName"
        };

        try {
            const response = await docClient.send(new ScanCommand(params));
            return response.Items;
        } catch (error) {
            throw new Error(`Scan operation failed: ${error}`);
        }
    }

    async function updateItem(id: string, updates: any) {
        const updateExpression = 'set';
        const expressionAttributeValues: Record<string, any> = {};
        const expressionAttributeNames: Record<string, string> = {};

        Object.keys(updates).forEach((key, index) => {
            const updateKey = `#key${index}`;
            const updateValue = `:value${index}`;
            updateExpression += ` ${updateKey} = ${updateValue},`;
            expressionAttributeNames[updateKey] = key;
            expressionAttributeValues[updateValue] = updates[key];
        });

        const params = {
            TableName: "YourTableName",
            Key: { id },
            UpdateExpression: updateExpression.slice(0, -1),
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW"
        };

        try {
            const response = await docClient.send(new UpdateCommand(params));
            return response.Attributes;
        } catch (error) {
            throw new Error(`Update operation failed: ${error}`);
        }
    }

    async function deleteItem(id: string) {
        const params = {
            TableName: "YourTableName",
            Key: { id }
        };

        try {
            await docClient.send(new DeleteCommand(params));
            return true;
        } catch (error) {
            throw new Error(`Delete operation failed: ${error}`);
        }
    }
}