import express, {Response} from "express";
import {addItem, ItemData} from "@/config/dbConfig";


interface IdbController {
    addItem: express.Handler,
    getItem: express.Handler,
}

const dbController: IdbController = {

    addItem: async (req: Response, res: Response)  => {

        const itemData: ItemData = {
            PK: 'user_0002',
            SK: 'user',
            data: 'Raoul'
        };
        try {
            await addItem(itemData);
            res.status(200).send('Item added successfully');
        } catch(error){
            console.error(error);
            res.status(500).send('Error adding item');
        }
    },

    getItem: async (req: Response, res: Response)  => {
        const itemData: ItemData = {
            PK: 'user_0001',
            SK: 'user',
            data: 'Raoul'
        };
        try {
            await addItem(itemData);
            res.status(200).send('Item added successfully');
        } catch(error){
            console.error(error);
            res.status(500).send('Error adding item');
        }
    }
};
export default dbController;