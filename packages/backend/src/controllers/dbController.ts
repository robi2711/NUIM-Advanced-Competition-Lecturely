import express, {Request, Response} from "express";
import {addItem, getItem, createUser, createRoom, getUser, getRoom, updateUser, deleteUser} from "@/helpers/dbHelper";
import {UserData,RoomData} from "@/types/dbTypes";

interface IdbController {
    deleteUser: express.Handler,
    addItem: express.Handler,
    getItem: express.Handler,
    updateUser: express.Handler,
    default: express.Handler,
}

const dbController: IdbController = {
    addItem: async (req: Request, res: Response)  => {
        const itemData: ItemData = {
            TableName: req.body.TableName,
            itemAttributes: req.body.itemAttributes,
        };
        try {
            await addItem(itemData);
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
            console.log(item);
            res.send(item);
        } catch(error){
            console.error(error);
            res.status(500).send('Error getting item');
        }
    },

    updateUser: async (req: Request, res: Response) => {
        //const { pk, sk, email, password } = req.body;
        const userData: UserData = {
            PK: 'user_0002',
            SK: 'user',
            email: 'damn@gmail.com',
            password: 'damn123'
        }
        try {
            const updatedAttributes = await updateUser(userData.PK, userData.SK, userData.email, userData.password);
            res.status(200).send(`User updated successfully:`);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error updating user');
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