import { makeAutoObservable, runInAction } from "mobx";
import dateFormat from "dateformat";

// stores
import instance from "./instance";

class AbsentStore {
	constructor() {
		makeAutoObservable(this);
	}

	absents = [];
	isLoading = true;

	fetchAbsents = async () => {
		try {
			const res = await instance.get("/absents");
			runInAction(() => {
				this.absents = res.data;
				this.isLoading = false;
			});
		} catch (error) {
			console.log(error);
		}
	};

	createAbsent = async (absentInfo) => {
		try {
			const res = await instance.post("/absents/posts", absentInfo);
			this.fetchAbsents();

			// there is a problem in push with DataGrid Pro
		} catch (error) {
			console.log(error);
		}
	};

	updateAbsent = async (absent) => {
		try {
			const foundAbsent = this.absents.find(
				(_absent) => _absent.id === absent.id
			);

			const newAbsent = {
				...foundAbsent,
				day: absent.day,
				date: absent.date,
				type: absent.type,
			};

			const res = await instance.put(`/absents/${foundAbsent._id}`, newAbsent);
			runInAction(() => {
				this.absents.map((_absent) =>
					_absent.id === absent.id ? res.data : _absent
				);
			});
			this.fetchAbsents();
		} catch (error) {
			console.log(error);
		}
	};

	deleteAbsent = async (absentId) => {
		try {
			const foundAbsent = this.absents.find(
				(_absent) => _absent.id === absentId
			);

			await instance.delete(`/absents/${foundAbsent._id}`);
			const filteredArray = this.absents.filter(
				(a) => a._id !== foundAbsent._id
			);
			runInAction(() => {
				this.absents = filteredArray;
			});
		} catch (error) {
			console.log(error);
		}
	};

	// Filter function:
	// If it's "Permission" page will show only current month and year
	// "Medical" and "Emergency" pages will show only current year
	// "Home page" will show all the records
	filterAbsents = (type) => {
		let absents = this.absents;
		const currentDate = new Date();

		switch (type) {
			case "Permission":
				const permissionFilter = this.absents
					.filter((_date) => {
						let formattedCurrentDate = dateFormat(currentDate, "mm yyyy");
						let formattedValueDate = dateFormat(_date.date, "mm yyyy");
						let thisYear = formattedValueDate === formattedCurrentDate;
						return thisYear;
					})
					.filter((_absent) => _absent.type === type);
				absents = permissionFilter;
				break;

			case "Medical":
				const medicalFilter = this.absents
					.filter((_date) => {
						let formattedCurrentDate = dateFormat(currentDate, "yyyy");
						let formattedValueDate = dateFormat(_date.date, "yyyy");
						let thisYear = formattedValueDate >= formattedCurrentDate;
						return thisYear;
					})
					.filter((_absent) => _absent.type === type);

				absents = medicalFilter;
				break;

			case "Emergency":
				const emergencyLeaveFilter = this.absents
					.filter((_date) => {
						let formattedCurrentDate = dateFormat(currentDate, "yyyy");
						let formattedValueDate = dateFormat(_date.date, "yyyy");
						let thisYear = formattedValueDate >= formattedCurrentDate;
						return thisYear;
					})
					.filter((_absent) => _absent.type === type);

				absents = emergencyLeaveFilter;
				break;

			default:
				absents = this.absents;
		}

		return absents;
	};
}

const absentStore = new AbsentStore();
export default absentStore;
