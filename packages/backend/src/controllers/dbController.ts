import express, {Request, Response} from "express";
import {addItem, getItem, updateItem, deleteItem} from "@/helpers/dbHelper";
import {ItemData} from "@/types/dbTypes";

interface IdbController {
    deleteItem: express.Handler,
    addItem: express.Handler,
    getItem: express.Handler,
    updateItem: express.Handler,
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

    default: async (req: Request, res: Response) => {
        res.json({
            sent: 'Hello World'
        });
    }
};
export default dbController;