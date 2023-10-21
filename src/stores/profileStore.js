import { makeAutoObservable, runInAction } from "mobx";

// stores
import instance from "./instance";
import absentStore from "./absentStore";
import authStore from "./authStore";

class ProfileStore {
	constructor() {
		makeAutoObservable(this);
	}

	profile = [];
	isLoading = true;

	fetchProfiles = async () => {
		try {
			if (!authStore.user) return;

			const res = await instance.get("/users/profile");
			runInAction(() => {
				this.profile = res.data;
				absentStore.fetchAbsents();
				this.isLoading = false;
			});
		} catch (error) {
			console.log(error);
		}
	};
}

const profileStore = new ProfileStore();
profileStore.fetchProfiles();
export default profileStore;
