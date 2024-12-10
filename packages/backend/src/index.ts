import userController from "@/controllers/userController";

require('dotenv').config();

import express from 'express';
import authRoutes from "@/routes/authRoutes";
import cors from "cors";
import router from "@/routes/authRoutes";

const app = express();

app.use(cors({
        origin: 'http://localhost:3000'
    }
));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.use('/auth', authRoutes);

const port = 3001;
app.listen(port, () => {
    console.log(`Server is listening on :${port}`);
});