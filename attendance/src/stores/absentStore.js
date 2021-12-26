import { makeAutoObservable, runInAction } from "mobx";

import instance from "./instance";

class AbsentStore {
	constructor() {
		makeAutoObservable(this);
	}

	absents = [];

	fetchAbsents = async () => {
		try {
			const res = await instance.get("/absents");
			runInAction(() => {
				this.absents = res.data;
			});
		} catch (error) {
			console.log(error);
		}
	};
}

const absentStore = new AbsentStore();
absentStore.fetchAbsents();
export default absentStore;
