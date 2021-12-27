import React from "react";
import { observer } from "mobx-react";
import moment from "moment";
import dateFormat, { masks } from "dateformat";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";

import {
	useGridApiRef,
	DataGridPro,
	GridToolbarContainer,
	GridActionsCellItem,
	GridToolbarExport,
	GridToolbarColumnsButton,
	GridToolbarDensitySelector,
	GridToolbarFilterButton,
} from "@mui/x-data-grid-pro";
import { LicenseInfo } from "@mui/x-data-grid-pro";
import { randomId } from "@mui/x-data-grid-generator";

import { Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

// components
import { LicenseKey } from "./LicenseKey";

// stores
import absentStore from "../../stores/absentStore";
import authStore from "../../stores/authStore";
import profileStore from "../../stores/profileStore";

LicenseInfo.setLicenseKey(LicenseKey);
function EditToolbar(props) {
	const { apiRef } = props;

	const handleClick = () => {
		const id = randomId();
		apiRef.current.updateRows([{ id, isNew: true }]);
		apiRef.current.setRowMode(id, "edit");
		// Wait for the grid to render with the new row
		setTimeout(() => {
			apiRef.current.scrollToIndexes({
				rowIndex: apiRef.current.getRowsCount() - 1,
			});

			apiRef.current.setCellFocus(id, "name");
		});
	};

	return (
		<GridToolbarContainer>
			<Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
				Add record
			</Button>
			<GridToolbarFilterButton style={{ marginLeft: 5 }} />
			<GridToolbarColumnsButton style={{ marginLeft: 5 }} />
			<GridToolbarDensitySelector style={{ marginLeft: 5 }} />
			<GridToolbarExport style={{ marginLeft: 5 }} />
		</GridToolbarContainer>
	);
}

EditToolbar.propTypes = {
	apiRef: PropTypes.shape({
		current: PropTypes.object.isRequired,
	}).isRequired,
};

function TableData() {
	const [editRowsModel, setEditRowsModel] = React.useState({});
	const handleEditRowsModelChange = React.useCallback((model) => {
		setEditRowsModel(model);
	}, []);

	console.log(editRowsModel);

	const apiRef = useGridApiRef();

	const absent = absentStore.absents.filter(
		(item) => item.user._id === authStore.user._id
	);

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
		absentStore.updateAbsent(row);
		apiRef.current.updateRows([{ ...row, isNew: false }]);
	};

	const handleDeleteClick = (id) => (event) => {
		event.stopPropagation();
		apiRef.current.updateRows([{ id, _action: "delete" }]);
	};

	const handleCancelClick = (id) => (event) => {
		event.stopPropagation();
		apiRef.current.setRowMode(id, "view");

		const row = apiRef.current.getRow(id);
		if (row.isNew) {
			apiRef.current.updateRows([{ id, _action: "delete" }]);
		}
	};

	const rows = absent.map((item) => ({
		id: item._id,
		user: item.user.name,
		day: item.day,
		date: dateFormat(item.date, "mmmm dd yyyy"),
		type: item.type,
		from: dateFormat(item.from, "mmmm dd yyyy"),
		to: dateFormat(item.to, "mmmm dd yyyy"),
	}));

	const columns = [
		{ field: "user", headerName: "Name", width: 220 },
		{
			field: "day",
			headerName: "Day",
			width: 220,
			editable: true,
			type: "singleSelect",
			valueOptions: ({ row }) => {
				return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
			},
		},
		{
			field: "date",
			headerName: "Date",
			width: 220,
			type: "date",
			editable: true,
		},

		{
			field: "type",
			headerName: "Type",
			width: 220,
			editable: true,
			type: "singleSelect",
			valueOptions: ({ row }) => {
				return ["Permission", "Medical", "Emergency leave"];
			},
		},
		{
			field: "from",
			headerName: "From",
			width: 220,
			type: "dateTime",
			editable: true,
		},
		{
			field: "to",
			headerName: "To",
			width: 220,
			type: "dateTime",
			editable: true,
		},
		{
			field: "actions",
			type: "actions",
			headerName: "Actions",
			width: 100,
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
				height: 600,
				width: "95%",
				"& .actions": {
					color: "text.secondary",
				},
				"& .textPrimary": {
					color: "text.primary",
				},
			}}
		>
			<DataGridPro
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

export default observer(TableData);
