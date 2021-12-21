import axios from "axios";
import baseURL from "./baseURL";

const instance = axios.create({
	baseURL: `${baseURL}/api`,
});

export default instance;
