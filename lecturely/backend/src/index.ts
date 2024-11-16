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

// Route to create a new user with Firebase Authentication
app.post('/createUser', async (req: Request, res: Response) => {
  const { email, password, displayName } = req.body;
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName
    });
    res.status(200).send({ message: 'User created successfully', uid: userRecord.uid });
  } catch (error) {
    res.status(400).send({ message: 'Error creating user', error });
  }
});

app.post('/signIn', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    const token = await admin.auth().createCustomToken(userRecord.uid);
    res.status(200).send({ message: 'User signed in successfully', token });
  } catch (error) {
    res.status(400).send({ message: 'Error signing in user', error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});