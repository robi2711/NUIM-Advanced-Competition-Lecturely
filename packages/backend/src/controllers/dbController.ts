import express, {Request, Response} from "express";
import {addRoom, getItem, updateItem, deleteItem, addUser} from "@/helpers/dbHelper";
import {ItemData,RoomData} from "@/types/dbTypes";

function getCurrentDate(): string {
    const now = new Date();
    return now.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

interface IdbController {
    deleteItem: express.Handler,
    addRoom: express.Handler,
    addUser: express.Handler,
    getItem: express.Handler,
    updateItem: express.Handler,
}

const dbController: IdbController = {
    addRoom: async (req: Request, res: Response)  => {
        const roomData: RoomData = {
            TableName: req.body.TableName,
            itemAttributes: {
                PK: req.body.itemAttributes.PK,
                SK: req.body.itemAttributes.SK,
                data: {
                    name: req.body.itemAttributes.data.name,
                    description: req.body.itemAttributes.data.description,
                    author: req.body.itemAttributes.data.author,
                    date: getCurrentDate(),

                },
            },
        };

        try {
            await addRoom(roomData);
            res.status(200).send('Room added successfully');
        } catch(error){
            console.error(error);
            res.status(500).send('Error adding room');
        }
    },

    addUser: async (req: Request, res: Response)  => {
        const itemData: ItemData = {
            TableName: req.body.TableName,
            itemAttributes: {
                PK: req.body.itemAttributes.PK,
                SK: req.body.itemAttributes.SK,
                data: {
                    username: req.body.itemAttributes.data.username,
                    email: req.body.itemAttributes.data.email,
                    rooms: req.body.itemAttributes.data.rooms,
                },
            },
        };
        try {
            await addUser(itemData);
            res.status(200).send('Item added successfully');
        } catch(error){
            console.error(error);
            res.status(500).send('Error adding item');
        }
    },

    getItem: async (req: Request, res: Response)  => {
        const itemData: ItemData = {
            TableName: req.body.TableName,
            itemAttributes: req.body.itemAttributes,
        };
        try {
            const item =  await getItem(itemData);
            res.send(item);
        } catch(error){
            console.error(error);
            res.status(500).send('Error getting item');
        }
    },

    updateItem: async (req: Request, res: Response) => {
        const updateReq: ItemData = {
            TableName: req.body.TableName,
            itemAttributes: {
                PK: req.body.itemAttributes.PK,
                SK: req.body.itemAttributes.SK,
                data: {
                    ExpressionAttributeValues: req.body.itemAttributes.data.ExpressionAttributeValues,
                    UpdateExpression: req.body.itemAttributes.data.UpdateExpression,
                },
            },

        };
        try {
            const updatedAttributes = await updateItem(updateReq);
            res.status(200).send(updatedAttributes);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating item');
        }
    },

    deleteItem: async (req: Request, res: Response)  => {
        const userData: ItemData = {
            TableName: req.body.TableName,
            itemAttributes: req.body.itemAttributes,
        };
        try {
            const item =  await deleteItem(userData);
            console.log(item);
            res.send(item);
            res.status(200).send('Item deleted');
        } catch(error){
            console.error(error);
            res.status(500).send('Error deleting item');
        }
    },

};
export default dbController;