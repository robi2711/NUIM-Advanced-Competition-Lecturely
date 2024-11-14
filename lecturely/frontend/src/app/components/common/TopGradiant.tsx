import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function TopGradiant() {
    return (
        <Box
            id="gradiant"
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '20%',
                backgroundImage: `linear-gradient(#021D02, ${alpha('#0A470A', 0.0)})`,
                backgroundSize: '100% 50%',
                backgroundRepeat: 'no-repeat',
                zIndex: -1,
            }}
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
            </Container>
        </Box>
    );
}