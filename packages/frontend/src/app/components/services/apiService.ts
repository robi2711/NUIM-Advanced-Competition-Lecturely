import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001",
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	}
});

export default api;

