require('dotenv').config();

import express from 'express';
import authRoutes from "@/routes/authRoutes";

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
});

app.use('/auth', authRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is listening on :${port}`);
});