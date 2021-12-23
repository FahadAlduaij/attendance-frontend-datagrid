import decode from "jwt-decode";
import { makeAutoObservable, runInAction } from "mobx";
import instance from "./instance";

class AuthStore {
	constructor() {
		makeAutoObservable(this);
	}

	user = null;

	setUser = (token) => {
		localStorage.setItem("myToken", token);
		instance.defaults.headers.common.Authorization = `Bearer ${token}`;
		runInAction(() => {
			this.user = decode(token);
		});
	};

	checkForToken = () => {
		const token = localStorage.getItem("myToken");
		if (token) {
			const tempUser = decode(token);
			const time = tempUser.exp * 1000;
			if (time > Date.now()) {
				return this.setUser(token);
			} else {
				return this.logout();
			}
		}
	};

	login = async (userData) => {
		try {
			const res = await instance.post("/users/login", userData);
			this.setUser(res.data.token);
		} catch (error) {
			console.log(error);
		}
	};

	register = async (userData) => {
		try {
			const res = await instance.post("/users/register", userData);
			this.setUser(res.data.token);
		} catch (error) {
			console.log(error);
		}
	};

	logout = () => {
		delete instance.defaults.headers.common.Authorization;
		localStorage.removeItem("myToken");
		runInAction(() => {
			this.user = null;
		});
	};
}

const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
