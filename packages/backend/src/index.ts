import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import {initializeCognitoClient} from "@/config/clientConfig";
import router from "@/routes/authRoutes";
import authController from "@/controllers/authController";
import { addItem, getItem, ItemData } from './config/dbConfig';
import itemRoutes from './routes/dbRoutes';
const PORT = 3001;


dotenv.config();


const app = express();

app.use(cors(
	{
		origin: 'http://localhost:3000'
	}
));
app.use(express.json());

app.use(session({
	secret: 'v',
	resave: true,
	saveUninitialized: false
}));



(async () => {
    try {
        await initializeCognitoClient();
    } catch (error) {
        console.error('Failed to initialize client:', error);
    }
})();

app.use('/db', itemRoutes);
app.use('/auth', router);
app.get('/Lecturely', authController.notsure);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});




