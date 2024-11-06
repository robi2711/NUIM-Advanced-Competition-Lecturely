import * as React from 'react';
import { alpha, Typography, Button } from '@mui/material';
import Box from '@mui/material/Box';

interface DashboardHeroProps {
    userName: string;
}
const DashboardHero: React.FC<DashboardHeroProps> = ({ userName }) => {
    //const context = useContext(UserContext) || {userEmail: '', setUserInfo: (email: any) => {} , getUserInfo: () => ''};

    return (
        <Box
            id="hero"
            sx={(theme) => ({
                width: '100%',
                display: 'flex', // Center the content
                alignItems: 'center', // Center vertically
                justifyContent: 'center', // Center horizontally
                flexDirection: 'column', // Stack items vertically
                textAlign: 'center', // Center text horizontally
                padding: theme.spacing(4), // Add padding
                backgroundImage:
                    theme.palette.mode === 'light'
                        ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                        : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
                backgroundSize: '100% 20%',
                backgroundRepeat: 'no-repeat',
                height: '100vh', // Fill the viewport height
            })}
        >
            <Typography variant="h2" gutterBottom>
                Welcome to NutriScan!
            </Typography>
            <Typography variant="h5" gutterBottom>
                Your personalized nutrition assistant.
            </Typography>
            <Button variant="contained" color="primary" size="large" href = "/NutriBarcode">
                Get Started
            </Button>
        </Box>
    );
};
export default DashboardHero;