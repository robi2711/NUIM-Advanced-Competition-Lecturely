import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useUser } from '@/app/components/services/UserContext';

export default function HomeHero() {
	const { userInfo } = useUser();

	return (
		<Box>
			<Container
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					pt: { xs: 14, sm: 18 },
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
						Welcome, {userInfo?.username}
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
}