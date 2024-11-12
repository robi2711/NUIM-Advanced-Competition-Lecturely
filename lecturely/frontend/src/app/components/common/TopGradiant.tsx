import Box from "@mui/material/Box";
import {alpha} from "@mui/material";
import Container from "@mui/material/Container";
import * as React from "react";

export default function TopGradiant() {

return (
    <Box
    sx={(theme) => ({
        width: '100%',
        backgroundImage:
            theme.palette.mode === 'light'
                ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
                : `linear-gradient(#021D02, ${alpha('#0A470A', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
    })}
>
    <Container
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs:1, sm:1 },
            pb: { xs:1, sm:10 },
        }}
    >

    </Container>
</Box>
);
}