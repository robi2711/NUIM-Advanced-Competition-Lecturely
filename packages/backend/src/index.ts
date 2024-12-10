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


app.use('/auth', ensureClientInitialized, router);





// app.get(getPathFromURL('http://localhost:3000/Lecturely') || '', async (req: CustomRequest, res: Response) => {
//     try {
//         const params = client.callbackParams(req);
//         const tokenSet = await client.callback(
//             'http://localhost:3000/Lecturely',
//             params,
//             {
//                 nonce: req.session.nonce,
//                 state: req.session.state
//             }
//         );
//         if (tokenSet.access_token) {
//             const userInfo = await client.userinfo(tokenSet.access_token);
//             req.session.userInfo = userInfo;
//             console.log('User info:', userInfo);
//             res.redirect(process.env.REDIRECT_URIS as string);
//         } else {
//             console.log('No access token');
//             res.redirect(process.env.REDIRECT_URIS as string);
//         }
//     } catch (err) {
//         console.error('Callback error:', err);
//         res.redirect(process.env.REDIRECT_URIS as string);
//     }
// });


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});