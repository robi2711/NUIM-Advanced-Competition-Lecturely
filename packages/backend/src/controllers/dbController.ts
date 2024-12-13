import express, {Request, Response} from "express";
import {createUser, createRoom, getItem, deleteItem} from "@/helpers/dbHelper";
import {ItemData,RoomData} from "@/types/dbTypes";

interface IdbController {
    createUser: express.Handler,
    createRoom: express.Handler,
    getItem: express.Handler,
    deleteItem: express.Handler,
    default: express.Handler,
}

const dbController: IdbController = {
    createUser: async (req: Request, res: Response)  => {
        const itemData: ItemData = {
            PK: 'user_0005',
            SK: 'user',
            email: 'test@gmail.com',
            password: 'xyz123'
        };
        try {
            await createUser(itemData);
            res.status(200).send('Item added successfully');
        } catch(error){
            console.error(error);
            res.status(500).send('Error adding item');
        }
    },

    createRoom: async (req: Request, res: Response)  => {
        const roomData: RoomData = {
            PK: 'ROOM#',
            SK: '#METADATA',
            GSI1PK: 'user_001',
            GSI2PK: '#meta',
            roomName: 'hydra',
            description: 'ssda',
            transcription: 'lorem',
        };
        try {
            await createRoom(roomData);
            res.status(200).send('Room added successfully');
        } catch(error){
            console.error(error);
            res.status(500).send('Error adding room');
        }
    },

    getItem: async (req: Request, res: Response)  => {
        const itemData: ItemData = {
            PK: 'user_0003',
            SK: 'user',
            email: 'test@gmail.com',
            password: 'xyz123'
        };
        try {
            const item =  await getItem(itemData.PK, itemData.SK, itemData.email, itemData.password);
            console.log(item);
            res.send(item);
        } catch(error){
            console.error(error);
            res.status(500).send('Error getting item');
        }
    },

    deleteItem: async (req: Request, res: Response)  => {
        const itemData: ItemData = {
            PK: 'user_0003',
            SK: 'user',
            email: 'test@gmail.com',
            password: 'xyz123'
        };
        try {
            const item =  await deleteItem(itemData.PK, itemData.SK);
            console.log(item);
            res.send(item);
            res.status(200).send('Item deleted');
        } catch(error){
            console.error(error);
            res.status(500).send('Error deleting item');
        }
    },

    default: async (req: Request, res: Response) => {
        res.json({
            sent: 'Hello World'
        });
    }
};
export default dbController;