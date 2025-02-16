import express from "express";
import { Router } from "express";
import authController from "@/controllers/authController";

const router: Router = express.Router();

router.get('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/callback', authController.callback);

router.post('/signUp', authController.signUp);

router.post('/signIn', authController.signIn)


export default router;