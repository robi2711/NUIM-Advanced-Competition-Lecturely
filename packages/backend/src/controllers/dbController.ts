import express, {Request, Response} from "express";
import {addItem, getItem} from "@/helpers/dbHelper";
import {ItemData} from "@/types/dbTypes";


interface IdbController {
    addItem: express.Handler,
    getItem: express.Handler,
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

    default: async (req: Request, res: Response) => {
        res.json({
            sent: 'Hello World'
        });
    }
};
export default dbController;