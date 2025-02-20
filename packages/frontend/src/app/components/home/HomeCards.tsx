import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Container from "@mui/material/Container";
import TextField from '@mui/material/TextField';
import api from '@/app/components/services/apiService';
import { useUser } from "@/app/components/services/UserContext";
import { useRouter } from 'next/navigation';
import {InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface responseData {
	NameValue: string;
	description: string;
	author: string;
	date: string;
}

const StyledCard = styled(Card)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	padding: 0,
	height: '100%',
	backgroundColor: theme.palette.background.paper,
	'&:hover': {
		backgroundColor: 'transparent',
		cursor: 'pointer',
	},
	'&:focus-visible': {
		outline: '3px solid',
		outlineColor: 'hsla(210, 98%, 48%, 0.5)',
		outlineOffset: '2px',
	},
}));

const StyledCardContent = styled(CardContent)({
	display: 'flex',
	flexDirection: 'column',
	gap: 4,
	padding: 16,
	flexGrow: 1,
	'&:last-child': {
		paddingBottom: 16,
	},
});

const StyledTypography = styled(Typography)({
	display: '-webkit-box',
	WebkitLineClamp: 2,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
});

interface AuthorProps {
	author: string;
	created: string;
}

function Author({ author, created }: AuthorProps) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				gap: 2,
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '16px',
			}}
		>
			<Box
				sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
			>
				<Avatar
					alt={author}
					sx={{ width: 24, height: 24 }}
				/>
				<Typography variant="caption">
					{author}
				</Typography>
			</Box>
			<Typography variant="caption">{created}</Typography>
		</Box>
	);
}

export default function MainContent() {
	const { userInfo } = useUser();
	const [searchQuery, setSearchQuery] = React.useState('');
	const [roomData, setRoomData] = React.useState<Array<{ title: string; description: string; author: string; created: string, href: string }>>([]);
	const router = useRouter();

	const handleCardClick = (href: string) => {
		router.push(href);
	};

	const fetchedRooms = new Set<string>();

	const getRoom = async (PK: string) => {
		if (fetchedRooms.has(PK)) {
			return;
		}
		fetchedRooms.add(PK);
		const response = await api.post<responseData>('/db/getItem', {
			TableName: "TestTable",
			itemAttributes: {
				PK: PK,
				SK: "room"
			}});
		if (response.data !== undefined) {
			setRoomData(prevRoomData => [
				...prevRoomData,
				{
					title: response.data.NameValue,
					description: response.data.description,
					author: response.data.author,
					created: response.data.date,
					href: "/room/" + PK
				}
			]);
		}
		console.log(roomData);
	}

	React.useEffect(() => {
		if (userInfo && userInfo.roomsOwned) {
			userInfo.roomsOwned.forEach(room => {
				getRoom("" + room);
			});
		}
		if (userInfo && userInfo.rooms) {
			userInfo.rooms.forEach(room => {
				getRoom("" + room);
			});
		}
	}, [userInfo]);

	const filteredRoomData = roomData.filter(room => room.title.toLowerCase().includes(searchQuery.toLowerCase()));
	const sortedRoomData = [...filteredRoomData].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

	return (
		<Box sx={{ flexGrow: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

			<Container>
				<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
					<TextField
						variant="outlined"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						sx={{ width: { xs: '80%', sm: '60%', md: '40%' } }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
					/>
				</Box>
				<Grid container spacing={2} justifyContent="center">

					{sortedRoomData.map((room, index) => (
						<Grid size={{ xs: 12, sm: 6, md: 3.5 }} key={index}>
							<StyledCard onClick={() => handleCardClick(room.href)}>
								<StyledCardContent>
									<StyledTypography variant="h5">
										{room.title}
									</StyledTypography>
									<Typography variant="body2" color="text.secondary">
										{room.description}
									</Typography>
								</StyledCardContent>
								<Author author={room.author} created={room.created} />
							</StyledCard>
						</Grid>
					))}
				</Grid>
			</Container>
		</Box>
	);
}