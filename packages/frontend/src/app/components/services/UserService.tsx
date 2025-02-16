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
					username: data.given_name,
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

export const addRoom = async (room: string) => {
	const { userInfo } = useUser();
	const { setUserInfo } = useUser();
	if (userInfo){
		try {
			await api.post('/db/updateItem', {
				TableName: 'TestTable',
				itemAttributes: {
					PK: userInfo.sub,
					SK: "users",
					data: {
						UpdateExpression: "SET rooms = list_append(if_not_exists(rooms, :emptyList), :room)",
						ExpressionAttributeValues: {
							":room": [room],
							":emptyList": [],
						}
					},
				}
			});
		} catch (error) {
			console.error(error);
		}
		try {
			setUserInfo({
				username: userInfo.username,
				email: userInfo.email,
				email_verified: userInfo.email_verified,
				sub: userInfo.sub,
				rooms: userInfo.rooms.concat(room),
			});
		} catch (error){
			console.error(error)
		}
	}
	else {
		console.log("User Is not Logged In");
	}
};