import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import { Issuer, Client, generators } from 'openid-client';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeClient } from "@/config/clientConfig";
import router from "@/routes/authRoutes";
import {getPathFromURL} from "@/helpers/authHelper";
import authController from "@/controllers/authController";
import {Client, Issuer} from "openid-client";
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




app.use(express.json());
//TODO: Send to database
app.post('/phraseReceiver', async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.phrase);
    res.send(req.body.phrase);
});

app.use('/auth', router);
app.get('/Lecturely', authController.notsure);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});