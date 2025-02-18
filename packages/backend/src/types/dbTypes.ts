export interface ItemData {
	TableName: string;
	itemAttributes: {
		PK: string;
		SK?: string;
		data?: any;
	}
}

export interface RoomData {
	TableName: string;
	itemAttributes: {
		roomName: string;
		author?: string;
		description?: string;
		authorSub?: string;
	}
}