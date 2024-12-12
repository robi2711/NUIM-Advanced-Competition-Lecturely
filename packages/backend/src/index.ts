import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import {initializeCognitoClient} from "@/config/cognitoConfig";
import authRouter from "@/routes/authRoutes";
import authController from "@/controllers/authController";
import dbRouter from './routes/dbRoutes';
import {getPathFromURL} from "@/helpers/authHelper";

const PORT = 3001;
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true
}));

app.use(session({
	secret: 'v',
	resave: true,
	saveUninitialized: false,
}));


(async () => {
    try {
        await initializeCognitoClient();
    } catch (error) {
        console.error('Failed to initialize client:', error);
    }
})();


app.use('/db', dbRouter);



app.use('/auth', authRouter);



app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});




