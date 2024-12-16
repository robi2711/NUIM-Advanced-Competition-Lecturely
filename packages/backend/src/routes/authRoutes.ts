import { Router } from "express";
import authController from "@/controllers/authController";

const router = Router();

router.get('/login', authController.login);

router.get('/logout', authController.logout);

router.get('/callback', authController.callback);


export default router;