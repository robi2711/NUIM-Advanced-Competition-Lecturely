import { Router } from "express";
import {checkAuth, getPathFromURL} from "@/helpers/authHelper";
import authController from "@/controllers/authController";

const router = Router();

router.get('/', checkAuth, authController.default);

router.get('/login', authController.login);

router.get('/logout', authController.logout);

//TODO: find the proper name for the following route


//router.get('/profile', authMiddleware, userController.getProfile);

export default router;