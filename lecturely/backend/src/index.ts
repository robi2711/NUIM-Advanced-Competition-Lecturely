import express, { Request, Response } from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import serviceAccount from '../firebase-private-key.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  databaseURL: process.env.FIREBASE_AUTH_DOMAIN
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());

// Route to add a user to the database
app.post('/addUser', async (req: Request, res: Response) => {
  const { uid, email, displayName } = req.body;
  try {
    await db.collection('users').doc(uid).set({
      email,
      displayName
    });
    res.status(200).send({ message: 'User added successfully' });
  } catch (error) {
    res.status(400).send({ message: 'Error adding user', error });
  }
});

// Route to retrieve a user from the database
app.get('/getUser/:uid', async (req: Request, res: Response) => {
  const { uid } = req.params;
  try {
    const userDoc = await db.collection('users').doc(uid).get();
    if (!userDoc.exists) {
      res.status(404).send({ message: 'User not found' });
    } else {
      res.status(200).send(userDoc.data());
    }
  } catch (error) {
    res.status(400).send({ message: 'Error retrieving user', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});