import express from 'express';
import { Router } from 'express';

import dbController from "@/controllers/dbController";
import {createUser} from "@/helpers/dbHelper";

const router: Router = express.Router();

router.get('/createUser', dbController.createUser);

router.get('/createRoom', dbController.createRoom);

router.get('/getUser', dbController.getUser);

router.get('/getRoom', dbController.getRoom);

router.get('/deleteUser', dbController.deleteUser);

router.get('/', dbController.default);

export default router;