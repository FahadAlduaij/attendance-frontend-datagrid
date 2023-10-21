import decode from "jwt-decode";
import { makeAutoObservable, runInAction } from "mobx";

// stores
import instance from "./instance";

class AuthStore {
	constructor() {
		makeAutoObservable(this);
	}

	user = null;
	isLoading = true;

	setUser = (token) => {
		localStorage.setItem("myToken", token);
		instance.defaults.headers.common.Authorization = `Bearer ${token}`;
		runInAction(() => {
			this.user = decode(token);
			this.isLoading = false;
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

		runInAction(() => {
			return (this.isLoading = false);
		});
	};

	login = async (userData, setErrorStatus) => {
		try {
			this.isLoading = true;

			const res = await instance.post("/users/login", userData);

			this.setUser(res.data.token);

			runInAction(() => {
				setErrorStatus(false);
				window.location.replace("/home");
				this.isLoading = false;
			});
		} catch (error) {
			runInAction(() => {
				setErrorStatus(true);
				this.isLoading = false;
			});

			console.log(error);
		}
	};

	register = async (userData, setErrorStatus) => {
		try {
			this.isLoading = true;

			const res = await instance.post("/users/register", userData);
			this.setUser(res.data.token);

			runInAction(() => {
				setErrorStatus(false);
				window.location.replace("/home");
				this.isLoading = false;
			});
		} catch (error) {
			runInAction(() => {
				setErrorStatus(true);
				this.isLoading = false;
			});
			console.log(error);
		}
	};

	logout = () => {
		delete instance.defaults.headers.common.Authorization;
		localStorage.removeItem("myToken");
		runInAction(() => {
			this.user = null;
			this.isLoading = false;
		});
	};
}

const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
