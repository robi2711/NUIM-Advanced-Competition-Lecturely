import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeClient } from "@/config/clientConfig";
import router from "@/routes/authRoutes";
import authController from "@/controllers/authController";
const PORT = 3001;


dotenv.config();


const app = express();

(async () => {
    try {
        await initializeClient();
    } catch (error) {
        console.error('Failed to initialize client:', error);
    }
})();

app.use(session({
    secret: 'v',
    resave: true,
    saveUninitialized: false
}));

app.use(cors(
    {
        origin: 'http://localhost:3000'
    }
));





app.use('/auth', router);
app.get('/Lecturely', authController.notsure);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});