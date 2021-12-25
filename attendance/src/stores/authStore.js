import decode from "jwt-decode";
import { makeAutoObservable, runInAction } from "mobx";
import instance from "./instance";

class AuthStore {
	constructor() {
		makeAutoObservable(this);
	}

	user = null;
	isSigned = false;

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
				this.isSigned = true;
				return this.setUser(token);
			} else {
				return this.logout();
			}
		}
	};

	login = async (userData, navigate, handleToggle) => {
		try {
			const res = await instance.post("/users/login", userData);
			this.setUser(res.data.token);
			handleToggle();
			setTimeout(
				() =>
					runInAction(() => {
						this.isSigned = true;
					}),
				1000
			);
			setTimeout(() => navigate("/home"), 1000);
		} catch (error) {
			console.log(error);
		}
	};

	register = async (userData, navigate, handleToggle) => {
		try {
			const res = await instance.post("/users/register", userData);
			this.setUser(res.data.token);
			handleToggle();
			setTimeout(
				() =>
					runInAction(() => {
						this.isSigned = true;
					}),
				1000
			);
			setTimeout(() => navigate("/home"), 1000);
		} catch (error) {
			console.log(error);
		}
	};

	logout = () => {
		delete instance.defaults.headers.common.Authorization;
		localStorage.removeItem("myToken");
		runInAction(() => {
			this.user = null;
			this.isSigned = false;
		});
	};
}

const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
