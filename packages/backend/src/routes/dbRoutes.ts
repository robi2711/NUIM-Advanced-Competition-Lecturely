import express from 'express';
import { Router } from 'express';

import dbController from "@/controllers/dbController";

const router: Router = express.Router();

router.post('/addItem', dbController.addItem);

router.post('/getItem', dbController.getItem);
router.get('/deleteUser', dbController.deleteUser);

router.get('/updateUser', dbController.updateUser);

router.get('/', dbController.default);

export default router;