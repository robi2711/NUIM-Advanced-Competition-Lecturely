import express from 'express';
import { Router } from 'express';

import dbController from "@/controllers/dbController";

const router: Router = express.Router();

router.post('/addItem', dbController.addItem);

router.post('/getItem', dbController.getItem);
    
router.get('/deleteItem', dbController.deleteItem);

router.post('/addUser', dbController.addUser);

router.post('/updateItem', dbController.updateItem);


export default router;