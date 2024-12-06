import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import { Issuer, Client, generators } from 'openid-client';
import cors from 'cors';
import dotenv from 'dotenv';


const PORT = process.env.PORT || 3001;


dotenv.config();

interface UserInfo {
    email?: string;
    phone?: string;
    [key: string]: any;
}

interface CustomRequest extends Request {
    isAuthenticated?: boolean;
    session: session.Session & {
        userInfo?: UserInfo;
        nonce?: string;
        state?: string;
    };
}

const app = express();
app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
));
let client: Client;

async function initializeClient(): Promise<void> {
    const issuer = await Issuer.discover('https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_nPakcZH5L');
    client = new issuer.Client({
        client_id: process.env.CLIENT_ID as string,
        client_secret: process.env.CLIENT_SECRET as string,
        redirect_uris: [process.env.REDIRECT_URIS as string],
        response_types: ['code']
    });
}

initializeClient().catch(console.error);

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false
}));

const checkAuth = (req: CustomRequest, res: Response, next: NextFunction): void => {
    req.isAuthenticated = !!req.session.userInfo;
    next();
};

app.get('/', checkAuth, (req: CustomRequest, res: Response) => {
    res.json({
        isAuthenticated: req.isAuthenticated,
        userInfo: req.session.userInfo
    });
});

app.get('/login', (req: CustomRequest, res: Response) => {
    const nonce = generators.nonce();
    const state = generators.state();

    req.session.nonce = nonce;
    req.session.state = state;

    const authUrl = client.authorizationUrl({
        state: state,
        nonce: nonce,
    });

    res.redirect(authUrl);
});

function getPathFromURL(urlString: string): string | null {
    try {
        const url = new URL(urlString);
        return url.pathname;
    } catch (error) {
        console.error('Invalid URL:', error);
        return null;
    }
}

app.get(getPathFromURL(process.env.REDIRECT_URIS as string) || '', async (req: CustomRequest, res: Response) => {
    try {
        const params = client.callbackParams(req);
        const tokenSet = await client.callback(
            process.env.REDIRECT_URIS as string,
            params,
            {
                nonce: req.session.nonce,
                state: req.session.state
            }
        );
        if (tokenSet.access_token) {
            const userInfo = await client.userinfo(tokenSet.access_token);
            req.session.userInfo = userInfo;
            res.redirect('http://localhost:3000/lecturely');
        } else {
            throw new Error('Access token is undefined');
        }
    } catch (err) {
        console.error('Callback error:', err);
        res.redirect('http://localhost:3000/lecturely');
    }
});

app.get('/logout', (req: CustomRequest, res: Response) => {
    req.session.destroy((err) => {
        if (err) console.error('Session destruction error:', err);
    });
    const logoutUrl = `https://eu-west-1npakczh5l.auth.eu-west-1.amazoncognito.com/logout?client_id=${process.env.CLIENT_ID as string}&logout_uri=<logout uri>`;
    res.redirect(logoutUrl);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});