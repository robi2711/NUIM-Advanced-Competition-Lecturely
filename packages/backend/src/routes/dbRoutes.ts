import express from 'express';
import { Router } from 'express';
import dbController from "@/controllers/dbController";

const router: Router = express.Router();

router.post('/addRoom', dbController.addRoom);

router.post('/getItem', dbController.getItem);

router.get('/deleteItem', dbController.deleteItem);

router.post('/addUser', dbController.addUser);

router.post('/updateItem', dbController.updateItem);

router.post('/queryJoinRoom', dbController.queryJoinRoom);



export default router;