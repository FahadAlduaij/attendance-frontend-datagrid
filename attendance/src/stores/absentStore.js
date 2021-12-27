import { makeAutoObservable, runInAction } from "mobx";

import instance from "./instance";
import moment from "moment";

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

	createAbsent = async (absentInfo) => {
		try {
			const res = await instance.post("/absents/posts", absentInfo);
			runInAction(() => {
				this.absents.push(res.data);
			});
		} catch (error) {
			console.log(error);
		}
	};

	updateAbsent = async (absent) => {
		try {
			const foundAbsent = this.absents.find(
				(_absent) => _absent._id === absent.id
			);

			const newAbsent = {
				day: absent.day,
				date: absent.date,
				type: absent.type,
				from: absent.from,
				to: absent.to,
			};
			console.log(newAbsent);
			const res = await instance.put(`/absents/${absent.id}`, newAbsent);
			runInAction(() => {
				this.absents.map((_absent) =>
					_absent._id === absent.id ? res.data : _absent
				);
			});
		} catch (error) {
			console.log(error);
		}
	};
}

const absentStore = new AbsentStore();
absentStore.fetchAbsents();
export default absentStore;
