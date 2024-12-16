import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import dotenv from 'dotenv';
dotenv.config();

const client = new DynamoDBClient({
    region: "eu-west-1",
    credentials: {
        accessKeyId: process.env.DYNAMO_KEY as string,
        secretAccessKey: process.env.DYNAMO_SECRET as string
    }
});

export const docClient = DynamoDBDocumentClient.from(client);
