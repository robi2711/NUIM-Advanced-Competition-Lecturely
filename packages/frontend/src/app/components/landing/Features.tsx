import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';

const items = [
    {
        icon: <ViewQuiltRoundedIcon />,
        title: 'Dashboard',
        description: 'Provides you with a full overview of your personal profile, where you can access your past lecture transcriptions, AI-generated summaries, and room history.',
        imageLight: 'url("/DashLight.png")',
        imageDark: 'url("/Dashboard.png")',
    },
    {
        icon: <EdgesensorHighRoundedIcon />,
        title: 'Rooms',
        description:
            'Our seamless real-time transcription system allows users to join rooms via QR code. As the speaker talks, the speech is converted into text and shared with all connected participants instantly.',
        imageLight: 'url("/RoomLight.png")',
        imageDark: 'url("/Room.png")',
    },
    {
        icon: <DevicesRoundedIcon />,
        title: 'Available on all platforms',
        description:
            'We offer full integration across devices including mobile, laptop, and desktop.',
        imageLight: 'url("/PhoneLight.png")',
        imageDark: 'url("/Phone.png")',
    },
];

export default function Features() {
    const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

    const handleItemClick = (index: number) => {
        setSelectedItemIndex(index);
    };

    return (
        <Container id="features" sx={{ py: { xs: 8, sm: 12 } }}>
            <Grid container spacing={6}>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ display: { xs: 'flex', sm: 'flex' }, width: '100%' }}
                >
                    <Card
                        variant="outlined"
                        sx={{
                            height: '100%',
                            width: '100%',
                            display: { xs: 'flex', sm: 'flex' },
                            pointerEvents: 'none',
                        }}
                    >
                        <Box
                            sx={{
                                m: 'auto',
                                width: 420,
                                height: 500,
                                backgroundSize: 'contain',
                                backgroundImage:items[selectedItemIndex].imageDark,

                            }}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        spacing={2}
                        useFlexGap
                        sx={{ width: '100%', display: { xs: 'flex', sm: 'flex' } }}
                    >
                        {items.map(({ icon, title, description }, index) => (
                            <Card
                                key={index}
                                variant="outlined"
                                component={Button}
                                onClick={() => handleItemClick(index)}
                                sx={{
                                    p: 3,
                                    height: 'fit-content',
                                    width: '100%',
                                    background: 'none',
                                    backgroundColor: selectedItemIndex === index
                                        ? 'action.selected'
                                        : undefined,
                                    borderColor: selectedItemIndex === index
                                        ? 'primary.light'
                                        : 'primary.dark',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '100%',
                                        display: 'flex',
                                        textAlign: 'left',
                                        flexDirection: { xs: 'column', md: 'row' },
                                        alignItems: { md: 'center' },
                                        gap: 2.5,
                                    }}
                                >
                                    <Box sx={{
                                        color: selectedItemIndex === index
                                            ? 'primary.main'
                                            : 'grey.700',
                                    }}>
                                        {icon}
                                        <Typography
                                            color="text.primary"
                                            variant="body2"
                                            fontWeight="bold"
                                        >
                                            {title}
                                        </Typography>

                                        <Typography
                                            color="text.secondary"
                                            variant="body2"
                                            sx={{ my: 1 }}
                                        >
                                            {description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        ))}
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    );
}