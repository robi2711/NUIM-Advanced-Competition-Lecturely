import { Router} from "express";
import userController from "../controllers/userController";
import authMiddleware from '../middleware/middleware';
import {checkAuth} from "@/helpers/authHelper";
import authController from "@/controllers/authController";
import {ensureClientInitialized} from "@/middleware/authMiddleware";

const router = Router();

router.post('/', checkAuth, authController.default);

router.post('/login', ensureClientInitialized, authController.login);

router.post('/logout', authController.logout);

//router.get('/profile', authMiddleware, userController.getProfile);

export default router;