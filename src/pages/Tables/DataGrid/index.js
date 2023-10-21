import React, { useEffect } from "react";
import { observer } from "mobx-react";
import dateFormat from "dateformat";
import {
	useGridApiRef,
	DataGridPro,
	GridActionsCellItem,
} from "@mui/x-data-grid-pro";
import { LicenseInfo } from "@mui/x-data-grid-pro";
import { Box } from "@mui/material";

// icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

// utils
import { LicenseKey } from "../../../utils/LicenseKey";

// components
import EditToolbar from "../EditToolbar";

// stores
import absentStore from "../../../stores/absentStore";
import theme from "../../../assets/theme";

LicenseInfo.setLicenseKey(LicenseKey);

function DataGrid(props) {
	const apiRef = useGridApiRef();

	const handleRowEditStart = (params, event) => {
		event.defaultMuiPrevented = true;
	};

	const handleRowEditStop = (params, event) => {
		event.defaultMuiPrevented = true;
	};

	const handleCellFocusOut = (params, event) => {
		event.defaultMuiPrevented = true;
	};

	const handleEditClick = (id) => (event) => {
		event.stopPropagation();
		apiRef.current.setRowMode(id, "edit");
	};

	const handleSaveClick = (id) => (event) => {
		event.stopPropagation();
		apiRef.current.commitRowChange(id);
		apiRef.current.setRowMode(id, "view");

		const row = apiRef.current.getRow(id);

		if (row.isNew) {
			absentStore.createAbsent(row);
		} else {
			absentStore.updateAbsent(row);
		}
		apiRef.current.updateRows([{ ...row, isNew: false }]);
	};

	const handleDeleteClick = (id) => (event) => {
		event.stopPropagation();
		apiRef.current.updateRows([{ id, _action: "delete" }]);
		absentStore.deleteAbsent(id);
	};

	const handleCancelClick = (id) => (event) => {
		event.stopPropagation();
		apiRef.current.setRowMode(id, "view");

		const row = apiRef.current.getRow(id);
		if (row.isNew) {
			apiRef.current.updateRows([{ id, _action: "delete" }]);
		}
	};

	const absent = absentStore.filterAbsents(props.type);

	useEffect(() => {
		absentStore.filterAbsents(props.type);
	}, [props.type]);

	const rows = absent.map((item) => ({
		id: item.id,
		name: item.name,
		day: item.day,
		date: dateFormat(item.date, "mmmm dd yyyy"),
		type: item.type,
	}));

	const columns = [
		{ field: "name", headerName: "Name", width: 200 },
		{
			field: "type",
			headerName: "Type",
			width: 300,
			editable: true,
			type: "singleSelect",
			valueOptions: ({ row }) => {
				return ["Permission", "Medical", "Emergency leave"];
			},
		},
		{
			field: "day",
			headerName: "Day",
			width: 300,
			editable: true,
			type: "singleSelect",
			valueOptions: ({ row }) => {
				return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
			},
		},

		{
			field: "date",
			headerName: "Date",
			width: 300,
			type: "date",
			editable: true,
		},

		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			width: 200,
			cellClassName: "actions",
			getActions: ({ id }) => {
				const isInEditMode = apiRef.current.getRowMode(id) === "edit";

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<SaveIcon />}
							label="Save"
							onClick={handleSaveClick(id)}
							color="primary"
						/>,
						<GridActionsCellItem
							icon={<CancelIcon />}
							label="Cancel"
							className="textPrimary"
							onClick={handleCancelClick(id)}
							color="inherit"
						/>,
					];
				}

				return [
					<GridActionsCellItem
						icon={<EditIcon />}
						label="Edit"
						className="textPrimary"
						onClick={handleEditClick(id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<DeleteIcon />}
						label="Delete"
						onClick={handleDeleteClick(id)}
						color="inherit"
					/>,
				];
			},
		},
	];

	return (
		<Box
			sx={{
				height: 700,
				width: "100%",
			}}
		>
			<DataGridPro
				sx={{
					border: 1,
				}}
				rows={rows}
				columns={columns}
				apiRef={apiRef}
				editMode="row"
				autoPageSize
				onRowEditStart={handleRowEditStart}
				onRowEditStop={handleRowEditStop}
				onCellFocusOut={handleCellFocusOut}
				components={{
					Toolbar: EditToolbar,
				}}
				componentsProps={{
					toolbar: { apiRef },
				}}
			/>
		</Box>
	);
}

export default observer(DataGrid);
