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


export const docClient = DynamoDBDocumentClient.from(client);
