import axios from "axios";

const api = axios.create({
	baseURL: 'https://backend-699152928201.europe-west1.run.app/8080',
	headers: {
		'Content-Type': 'application/json',

	}
});

export default api;

