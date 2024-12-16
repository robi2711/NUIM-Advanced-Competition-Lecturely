import express, {Request, Response} from "express";
import {createUser, createRoom, getUser, getRoom, deleteUser} from "@/helpers/dbHelper";
import {UserData,RoomData} from "@/types/dbTypes";

interface IdbController {
    createUser: express.Handler,
    createRoom: express.Handler,
    getUser: express.Handler,
    getRoom: express.Handler,
    deleteUser: express.Handler,
    default: express.Handler,
}

const dbController: IdbController = {
    createUser: async (req: Request, res: Response)  => {
        const userData: UserData = {
            PK: 'user_0008',
            SK: 'user',
            email: 'test@gmail.com',
            password: 'xyz123'
        };
        try {
            await createUser(userData);
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

    getUser: async (req: Request, res: Response)  => {
        const userData: UserData = {
            PK: 'user_0008',
            SK: 'user',
            email: 'test@gmail.com',
            password: 'xyz123'
        };
        try {
            const item =  await getUser(userData.PK, userData.SK);
            console.log(item);
            res.send(item);
        } catch(error){
            console.error(error);
            res.status(500).send('Error getting item');
        }
    },

    getRoom: async (req: Request, res: Response)  => {
        const roomData: RoomData = {
            PK: 'ROOM#',
            SK: '#METADATA',
            roomName: 'hydra',
            description: 'ssda',
            transcription: 'lorem'
        };
        try {
            const item =  await getRoom(roomData.PK, roomData.SK);
            console.log(item);
            res.send(item);
        } catch(error){
            console.error(error);
            res.status(500).send('Error getting item');
        }
    },


    deleteUser: async (req: Request, res: Response)  => {
        const userData: UserData = {
            PK: 'user_0000',
            SK: 'user',
            email: 'test@gmail.com',
            password: 'xyz123'
        };
        try {
            const item =  await deleteUser(userData.PK, userData.SK);
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