import express from 'express';
import { Router } from 'express';

import dbController from "@/controllers/dbController";

const router: Router = express.Router();

router.get('/addItem', dbController.addItem);

router.get('/getItem', dbController.getItem);

router.get('/', dbController.default);

export default router;