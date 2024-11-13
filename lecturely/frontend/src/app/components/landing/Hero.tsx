import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function Hero() {
    return (
        <Box
            id="hero"
            sx={({
                width: '100%',
                backgroundImage: `linear-gradient(#021D02, ${alpha('#0A470A', 0.0)})`,
                backgroundSize: '100% 20%',
                backgroundRepeat: 'no-repeat',
            })}
        >
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    pt: { xs: 14, sm: 20 },
                    pb: { xs: 8, sm: 12 },
                }}
            >
                <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
                    <Typography
                        component="h1"
                        variant="h1"
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignSelf: 'center',
                            textAlign: 'center',
                        }}
                    >
                        Lecture
                        <Typography
                            component="span"
                            variant="h1"
                            sx={{color: 'primary.main'}}
                        >
                            ly
                        </Typography>
                    </Typography>
                    <Typography variant="body1" textAlign="center" color="text.secondary">
                        You are NOT what you eat - Both inside and out - Know the hidden details about the food you consume. <br />
                        Achieve your personal health goals using the best nutritional tool on the market today.
                    </Typography>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        alignSelf="center"
                        spacing={1}
                        useFlexGap
                        sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
                    >
                        <TextField
                            id="outlined-basic"
                            size="medium"
                            variant="outlined"
                            aria-label="Enter your email address"
                            placeholder="Your email address"
                        />
                        <Button variant="contained" color="primary" href='/SignUp'>
                            Start now
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
