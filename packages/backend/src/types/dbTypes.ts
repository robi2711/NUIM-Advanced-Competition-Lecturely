export interface UserData {
	PK: string;
	SK: string;
	GSI1PK?: string;
	GSI2PK?: string;
	email: string;
	password: string;
	//data: string;
}

export interface RoomData {
	PK: string;
	SK: string;
	GSI1PK?: string;
	GSI2PK?: string;
	roomName: string;
	description: string;
	transcription: string;
}