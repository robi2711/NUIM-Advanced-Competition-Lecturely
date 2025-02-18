import express, {Request, Response} from "express";
import {addRoom, getItem, updateItem, deleteItem, addUser, queryRoom} from "@/helpers/dbHelper";
import {ItemData,RoomData} from "@/types/dbTypes";

interface IdbController {
    deleteItem: express.Handler,
    addRoom: express.Handler,
    addUser: express.Handler,
    getItem: express.Handler,
    updateItem: express.Handler,
    queryRoom: express.Handler,
}

const dbController: IdbController = {
    addRoom: async (req: Request, res: Response)  => {
        const roomData: RoomData = {
            TableName: req.body.TableName,
            itemAttributes: {
                roomName: req.body.itemAttributes.name,
                description: req.body.itemAttributes.description,
                author: req.body.itemAttributes.author,
                authorSub: req.body.itemAttributes.authorSub
            }
        };

        try {
            const room = await addRoom(roomData);
            res.send(room);
        } catch(error){
            console.error(error);
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
                    roomsOwned: req.body.itemAttributes.data.roomsOwned,
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

    queryRoom: async (req: Request, res: Response) => {
        const roomData: RoomData = {
            TableName: req.body.TableName,
            itemAttributes: {
                roomName: req.body.itemAttributes.roomName,
            },
        };
        try {
            const room = await queryRoom(roomData);
            if(room){
                if(room[0].password === req.body.itemAttributes.password){
                    console.log("Password Correct")
                    res.send(room[0]);
                }
                else{
                    res.send("Password Incorrect")
                }
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Error querying room');
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