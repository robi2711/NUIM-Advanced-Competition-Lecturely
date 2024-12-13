import express from 'express';
import { Router } from 'express';

import dbController from "@/controllers/dbController";
import {createUser} from "@/helpers/dbHelper";

const router: Router = express.Router();

router.get('/addItem', dbController.createUser);

router.get('/addRoom', dbController.createRoom);

router.get('/getItem', dbController.getItem);

router.get('/deleteItem', dbController.deleteItem);

router.get('/', dbController.default);

export default router;