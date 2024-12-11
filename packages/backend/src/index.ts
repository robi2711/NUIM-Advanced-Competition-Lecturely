import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import { ensureClientInitialized } from "@/middleware/authMiddleware";
import router from "@/routes/authRoutes";
const PORT = 3001;


dotenv.config();


const app = express();

app.use(ensureClientInitialized);


app.use(cors(
    {
        origin: 'http://localhost:3000'
    }
));


app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false
}));


app.use('/auth', router);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});