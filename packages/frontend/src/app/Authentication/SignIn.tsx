import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import ForgotPassword from './ForgotPassword';

export default function SignIn() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <Box>
            <CssBaseline enableColorScheme />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                sx={{ alignSelf: 'center' }}
            >
                Forgot your password?
            </Link>
        </Box>
    );
}