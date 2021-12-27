import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { observer } from "mobx-react";
import moment from "moment";

// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/profileStore";

function TableData({ absent }) {
	const [state, setState] = React.useState("");
	const columns = [
		{ field: "id", headerName: "ID", width: 170 },
		{ field: "user", headerName: "Name", width: 200 },

		{
			field: "day",
			headerName: "Day",
			width: 200,
		},
		{
			field: "date",
			headerName: "Date",
			width: 200,
		},
		{
			field: "type",
			headerName: "Type",
			width: 200,
		},
		{
			field: "from",
			headerName: "From",
			width: 200,
		},
		{
			field: "to",
			headerName: "To",
			width: 200,
		},
	];

	const rows = absent.map((item) => ({
		id: item._id,
		user: item.user.name,
		day: moment(item.day).format("dddd"),
		date: moment(item.date).format("DD/MM/yyyy"),
		type: item.type,
		from: moment(item.from).format("LT"),
		to: moment(item.to).format("LT"),
	}));

	return (
		<div style={{ width: "95%" }}>
			<DataGrid
				autoHeight={true}
				rows={rows}
				columns={columns}
				autoPageSize
				pageSize={100}
				rowsPerPageOptions={[100]}
				checkboxSelection
				onSelectionModelChange={(e) => setState(e)}
			/>
		</div>
	);
}

export default observer(TableData);
