import api from "@/app/components/services/apiService";
import {UserInfo, useUser} from "@/app/components/services/UserContext";

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
					roomsOwned: [],
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

export const addRoom = async (room: string, userInfo: any, setUserInfo: any) => {
	if (userInfo){
		if (userInfo.rooms.includes(room)) {
			console.log("Room already exists in user info");
			return;
		}
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
				sub: userInfo.sub,
				accessToken: userInfo.accessToken,
				idToken: userInfo.idToken,
				refreshToken: userInfo.refreshToken,
				tokenType: userInfo.tokenType,
				rooms: userInfo.rooms.concat(room),
				roomsOwned: userInfo.roomsOwned
			});
		} catch (error){
			console.error(error)
		}
	}
	else {
		console.log("User Is not Logged In");
	}
};

export const addRoomToAuthor = async (room: string, userInfo: any, setUserInfo: any) => {
	if (userInfo){
		if (userInfo.roomsOwned.includes(room)) {
			console.log("Room already exists in user info");
			return;
		}
		try {
			await api.post('/db/updateItem', {
				TableName: 'TestTable',
				itemAttributes: {
					PK: userInfo.sub,
					SK: "users",
					data: {
						UpdateExpression: "SET roomsOwned = list_append(if_not_exists(roomsOwned, :emptyList), :room)",
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
				sub: userInfo.sub,
				accessToken: userInfo.accessToken,
				idToken: userInfo.idToken,
				refreshToken: userInfo.refreshToken,
				tokenType: userInfo.tokenType,
				roomsOwned: userInfo.roomsOwned.concat(room),
				rooms: userInfo.rooms
			});
		} catch (error){
			console.error(error)
		}
	}
	else {
		console.log("User Is not Logged In");
	}
};
