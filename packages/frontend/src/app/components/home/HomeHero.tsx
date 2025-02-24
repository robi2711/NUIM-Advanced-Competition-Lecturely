import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useUser } from '@/app/components/services/UserContext';

export default function HomeHero() {
	const { userInfo } = useUser();

	return (
		<Box sx={{ mt: 4 }}>
			<Container
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					pt: { xs: 10, sm: 18 },
					pb: { xs: 6, sm: 12 },
				}}
			>
				<Stack spacing={2} useFlexGap sx={{ width: { xs: '90%', sm: '70%' } }}>
					<Typography
						component="h1"
						variant="h4"
						sx={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
							textAlign: 'center',
							fontSize: { xs: '1.5rem', sm: '2.5rem' },
						}}
					>
						Welcome, {userInfo?.username}
					</Typography>
				</Stack>
			</Container>
		</Box>
	);
}