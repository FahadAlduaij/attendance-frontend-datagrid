import React from "react";
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from "@mui/material";

function WarningMessage({ openDelete, handleDelete, handleCloseDelete, txt }) {
	return (
		<Dialog
			open={openDelete}
			onClose={handleCloseDelete}
			aria-labelledby="responsive-dialog-title"
		>
			<DialogTitle id="responsive-dialog-title">
				Are You Sure You Want To Delete?
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					This absent will be deleted immediately. You can't undo this action.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCloseDelete} variant="soft">
					Cancel
				</Button>
				<Button onClick={handleDelete} variant="contained" color="error">
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default WarningMessage;
