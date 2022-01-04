import React from "react";
import { observer } from "mobx-react";
import dateFormat, { masks } from "dateformat";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

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

import { Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

// components
import { LicenseKey } from "../../../utils/LicenseKey";
import ThemeColors from "../../../theme/ThemeColors";

// stores
import absentStore from "../../../stores/absentStore";
import authStore from "../../../stores/authStore";

LicenseInfo.setLicenseKey(LicenseKey);

function EditToolbar(props) {
	const { apiRef } = props;

	const handleClick = () => {
		const id = uuidv4();

		const row = [
			{
				id,
				user: authStore.user._id,
				name: authStore.user.name,
				day: "Sunday",
				date: dateFormat(Date.now(), "mmmm dd yyyy"),
				type: "Permission",
				isNew: true,
			},
		];

		apiRef.current.updateRows(row);
		apiRef.current.setRowMode(id, "edit");

		// Wait for the grid to render with the new row
		setTimeout(() => {
			apiRef.current.scrollToIndexes({
				rowIndex: apiRef.current.getRowsCount() - 1,
			});

			apiRef.current.setCellFocus(id, "type");
		});
	};

	return (
		<GridToolbarContainer
			style={{ backgroundColor: ThemeColors.primary, height: 70 }}
		>
			<Button
				startIcon={<AddIcon />}
				onClick={handleClick}
				sx={{
					color: ThemeColors.secondary,
					ml: 2,
					height: "70%",
					padding: 2,
					":hover": {
						backgroundColor: ThemeColors.secondary,
						color: ThemeColors.primary,
					},
				}}
			>
				Add record
			</Button>
			<GridToolbarFilterButton
				sx={{
					color: ThemeColors.secondary,
					ml: 5,
					height: "70%",
					padding: 2,

					":hover": {
						backgroundColor: ThemeColors.secondary,
						color: ThemeColors.primary,
					},
				}}
			/>
			<GridToolbarColumnsButton
				sx={{
					color: ThemeColors.secondary,
					ml: 5,
					height: "70%",
					padding: 2,
					":hover": {
						backgroundColor: ThemeColors.secondary,
						color: ThemeColors.primary,
					},
				}}
			/>
			<GridToolbarDensitySelector
				sx={{
					color: ThemeColors.secondary,
					ml: 5,
					height: "70%",
					padding: 2,
					":hover": {
						backgroundColor: ThemeColors.secondary,
						color: ThemeColors.primary,
					},
				}}
			/>
			<GridToolbarExport
				sx={{
					color: ThemeColors.secondary,
					ml: 5,
					height: "70%",
					padding: 2,
					":hover": {
						backgroundColor: ThemeColors.secondary,
						color: ThemeColors.primary,
					},
				}}
			/>
		</GridToolbarContainer>
	);
}

EditToolbar.propTypes = {
	apiRef: PropTypes.shape({
		current: PropTypes.object.isRequired,
	}).isRequired,
};

function DataGrid() {
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

	const absent = absentStore.absents
		.filter((item) => item.user._id === authStore.user._id)
		.filter((a) => a.type === "Permission");

	const rows = absent.map((item) => ({
		id: item.id,
		name: item.name,
		day: item.day,
		date: dateFormat(item.date, "mmmm dd yyyy"),
		type: item.type,
	}));

	const columns = [
		{ field: "name", headerName: "Name", width: 300 },
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
			field: "type",
			headerName: "Type",
			width: 300,
			editable: true,
			type: "singleSelect",
			valueOptions: ({ row }) => {
				return ["Permission"];
			},
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

export default observer(DataGrid);
