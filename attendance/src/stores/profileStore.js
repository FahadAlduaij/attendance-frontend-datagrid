import { makeAutoObservable, runInAction } from "mobx";

import instance from "./instance";

class ProfileStore {
	constructor() {
		makeAutoObservable(this);
	}

	profiles = [];

	fetchProfiles = async () => {
		try {
			const res = await instance.get("/users/profiles");
			runInAction(() => {
				this.profiles = res.data;
			});
		} catch (error) {
			console.log(error);
		}
	};
}

const profileStore = new ProfileStore();
profileStore.fetchProfiles();
export default profileStore;
