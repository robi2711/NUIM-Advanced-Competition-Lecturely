import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import { Issuer, Client, generators } from 'openid-client';
import cors from 'cors';
import dotenv from 'dotenv';
import { ensureClientInitialized } from "@/middleware/authMiddleware";
import router from "@/routes/authRoutes";
const PORT = 3001;


dotenv.config();

const app = express();
app.use(cors({
        origin: 'http://localhost:3000'
    }
));

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());
//TODO: Send to database
app.post('/phraseReceiver', async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.phrase);
    res.send(req.body.phrase);
});

app.use('/auth', ensureClientInitialized, router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});