import api from "@/app/components/services/apiService";
import {useUser} from "@/app/components/services/UserContext";

export const addUser = async (data: any) => {
	try {
		await api.post('/db/addUser', {
			TableName: 'TestTable',
			itemAttributes: {
				PK: data.sub,
				SK: "users",
				data: {
					username: data.username,
					email: data.email,
					rooms: [],
				}
			}
		});
	} catch (error) {
		console.error(error);
	}
};

export const getUser = async (sub: string) => {
	try {
		const response = await api.post('/db/getItem', {
			TableName: 'TestTable',
			itemAttributes: {
				PK: sub,
				SK:"users",
			}
		});
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
