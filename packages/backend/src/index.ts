import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import {initializeCognitoClient} from "@/config/clientConfig";
import router from "@/routes/authRoutes";
import authController from "@/controllers/authController";
import { addItem, getItem, ItemData } from './config/dynamoConfig';
import itemRoutes from './routes/itemRoutes';
const PORT = 3001;


dotenv.config();


const app = express();

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


app.post('/add', async (req, res)  => {
	const itemData: ItemData = {
		PK: 'user_0002',
		SK: 'user',
		data: 'Raoul'
	};
	try {
		await addItem(itemData);
		res.status(200).send('Item added successfully');
	} catch(error){
		console.error(error);
		res.status(500).send('Error adding item');
	}
});





app.get('/get-item', async (req, res)  => {
	const itemData: ItemData = {
		PK: 'user_0001',
		SK: 'user',
		data: 'Raoul'
	};
	try {
		await addItem(itemData);
		res.status(200).send('Item added successfully');
	} catch(error){
		console.error(error);
		res.status(500).send('Error adding item');
	}
});

app.use('/auth', router);
app.get('/Lecturely', authController.notsure);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.use(cors(
    {
        origin: 'http://localhost:3000'
    }
));



