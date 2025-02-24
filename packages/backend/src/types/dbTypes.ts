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
		roomName?: string;
		author?: string;
		PK?: string;
		description?: string;
		authorSub?: string;
		phraseList?: string[];
		password?: string;
		NameValue?: string;
		isActive?: boolean;
		participantList?: string[];
	}
}