import axios from "axios";
import baseURL from "./baseURL";

const instance = axios.create({
	baseURL: `http://localhost:8000/api`,
});

export default instance;
