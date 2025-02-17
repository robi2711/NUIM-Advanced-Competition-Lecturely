import axios from "axios";

let api;
export default api = axios.create({
	baseURL: 'http://localhost:3001',
	headers: {
		'Content-Type': 'application/json',

	}
});

