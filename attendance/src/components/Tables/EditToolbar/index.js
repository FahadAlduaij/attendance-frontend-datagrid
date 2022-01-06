import React from "react";
import { observer } from "mobx-react";
import dateFormat from "dateformat";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import {
	GridToolbarContainer,
	GridToolbarExport,
	GridToolbarColumnsButton,
	GridToolbarDensitySelector,
	GridToolbarFilterButton,
} from "@mui/x-data-grid-pro";

import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// components
import ThemeColors from "../../../theme/ThemeColors";

// stores
import authStore from "../../../stores/authStore";

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

export default observer(EditToolbar);
