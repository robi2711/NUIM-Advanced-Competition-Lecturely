import { DynamoDBClient, CreateTableCommand, DescribeTableCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import dotenv from 'dotenv';
dotenv.config();


const client = new DynamoDBClient({
    region: "eu-west-1",
    credentials: {
        accessKeyId: process.env.KEY as string,
        secretAccessKey: process.env.SECRET as string
    }
});

export interface ItemData {
    PK: string;
    SK: string;
    data: string;
}

export const docClient = DynamoDBDocumentClient.from(client);



const addItem = async (data: ItemData) => {
    try {
        const params = {
            TableName: 'users',
            Item: data
        };
        await docClient.send(new PutCommand(params));
        console.log("Item added successfully");
    } catch (error) {
        console.error("Error adding item:", error);
        throw error;
    }
};




const getItem = async (pk: string, sk: string) => {
    try {
        const params = {
            TableName: 'Users',
            Key: { PK: pk, SK: sk }
        };
        const result = await docClient.send(new GetCommand(params));
        return result.Item;
    } catch (error) {
        console.error("Error retrieving item:", error);
        throw error;
    }
};

export { addItem, getItem, ItemData };