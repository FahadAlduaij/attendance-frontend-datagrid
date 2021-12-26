import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { observer } from "mobx-react";

// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/profileStore";

function TableData({ absent }) {
	const columns = [
		{ field: "id", headerName: "ID", width: 170 },
		{ field: "user", headerName: "Name", width: 200 },

		{
			field: "day",
			headerName: "Day",
			type: "text",
			width: 200,
		},
		{
			field: "date",
			headerName: "Date",
			type: "text",
			width: 200,
		},
		{
			field: "type",
			headerName: "Type",
			type: "text",
			width: 200,
		},
		{
			field: "from",
			headerName: "From",
			type: "text",
			width: 200,
		},
		{
			field: "to",
			headerName: "To",
			type: "text",
			width: 200,
		},
		// {
		// 	field: "date",
		// 	headerName: "emergency leave",
		// 	description: "This column has a value getter and is not sortable.",
		// 	sortable: true,
		// 	width: 200,
		// 	valueGetter: (params) =>
		// 		`${params.getValue(params.id, "firstName") || ""} ${
		// 			params.getValue(params.id, "lastName") || ""
		// 		}`,
		// },
	];

	const rows = absent.map((item) => ({
		id: item._id,
		user: item.user.name,
		day: item.day,
		date: item.date,
		type: item.type,
		from: item.from,
		to: item.to,
	}));

	return (
		<div style={{ height: "100vh", width: "95%" }}>
			<DataGrid
				autoHeight
				rows={rows}
				columns={columns}
				autoPageSize
				pageSize={100}
				rowsPerPageOptions={[100]}
				checkboxSelection
			/>
		</div>
	);
}

export default observer(TableData);
