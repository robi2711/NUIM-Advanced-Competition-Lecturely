import express from "express";
import { Router } from "express";
import authController from "@/controllers/authController";

const router: Router = express.Router();

router.post('/signUp', authController.signUp);

router.post('/signOut', authController.signOut);

router.post('/signIn', authController.signIn)


export default router;