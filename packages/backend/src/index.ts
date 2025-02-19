import express from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import authRouter from "@/routes/authRoutes";
import dbRouter from './routes/dbRoutes';

const PORT = 3001;
dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
	origin: process.env.FRONTEND_URL,
	credentials: true
}));

app.use(session({
	secret: 'v',
	resave: true,
	saveUninitialized: false,
	cookie: { secure: false }
}));

app.use('/db', dbRouter);
app.use('/auth', authRouter);
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});




