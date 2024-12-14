export interface ItemData {
	TableName: string;
	itemAttributes: {
		PK: string;
		SK: string;
		data?: any;
	}
}