import React from "react";
import { observer } from "mobx-react";
import dateFormat from "dateformat";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import {
	GridToolbarContainer,
	GridToolbarExport,
	GridToolbarFilterButton,
	GridToolbarColumnsButton,
	GridToolbarDensitySelector,
} from "@mui/x-data-grid-pro";
import { Button, Stack } from "@mui/material";

// icons
import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

// components
import theme from "../../../assets/theme";

// stores
import authStore from "../../../stores/authStore";

function EditToolbar(props) {
	const { apiRef } = props;
	const navigate = useNavigate();

	// If the user pressed Add new? choose automatically the type if absent.
	const path = window.location.pathname.slice(1);
	const type = path.charAt(0).toUpperCase() + path.slice(1);

	// If the user pressed Add new? choose automatically the current Day.
	const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
	const d = new Date();
	let currentDay = weekday[d.getDay()];

	// To map on the top filter buttons
	const navButtons = [
		{ title: "all", route: "" },
		{ title: "permission", route: "permission" },
		{ title: "medical", route: "medical" },
		{ title: "emergency", route: "emergency" },
	];

	const handleClick = () => {
		const id = uuidv4();
		const row = [
			{
				id,
				user: authStore.user?._id,
				name: authStore.user?.name,
				day: currentDay,
				date: dateFormat(Date.now(), "mmmm dd yyyy"),
				type: type ? type : "Permission",
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

	const handleNavigate = (value) => {
		navigate(`/${value}`);
	};

	return (
		<GridToolbarContainer
			style={{
				backgroundColor: theme.palette.secondary.main,
			}}
		>
			<Stack direction={"row"} spacing={1} p={1}>
				<Button
					startIcon={<AddIcon />}
					onClick={handleClick}
					sx={{
						color: theme.palette.primary.main,
						padding: 2,

						":hover": {
							backgroundColor: theme.palette.primary.main,
							color: theme.palette.secondary.main,
						},
					}}
				>
					Add record
				</Button>

				{navButtons.map((btn, index) => {
					return (
						<Button
							key={index}
							startIcon={<FilterAltIcon />}
							onClick={() => handleNavigate(btn.route)}
							sx={{
								color: theme.palette.primary.main,
								width: 150,
								padding: 2,
								":hover": {
									backgroundColor: theme.palette.primary.main,
									color: theme.palette.secondary.main,
								},
							}}
						>
							{btn.title}
						</Button>
					);
				})}

				<GridToolbarFilterButton
					sx={{
						color: theme.palette.primary.main,
						padding: 2,
						width: 150,
						":hover": {
							backgroundColor: theme.palette.primary.main,
							color: theme.palette.secondary.main,
						},
					}}
				/>

				<GridToolbarExport
					sx={{
						color: theme.palette.primary.main,
						width: 150,
						padding: 2,
						":hover": {
							backgroundColor: theme.palette.primary.main,
							color: theme.palette.secondary.main,
						},
					}}
				/>
			</Stack>
		</GridToolbarContainer>
	);
}

EditToolbar.propTypes = {
	apiRef: PropTypes.shape({
		current: PropTypes.object.isRequired,
	}).isRequired,
};

export default observer(EditToolbar);
