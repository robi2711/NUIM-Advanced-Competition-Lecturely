import express from 'express';
import { addItem, getItem, ItemData } from './config/dynamo';
import itemRoutes from './routes/itemRoutes';
require('dotenv').config();

const app = express();
app.use(express.json());

//app.use('/items', itemRoutes);

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

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});