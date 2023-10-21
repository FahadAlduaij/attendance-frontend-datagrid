import React from "react";
import { observer } from "mobx-react";
import { Backdrop, CircularProgress } from "@mui/material";

// theme
import theme from "../../assets/theme";

function Spinner({ open }) {
	return (
		<Backdrop
			sx={{
				color: theme.palette.secondary.main,
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}
			open={open}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}

export default observer(Spinner);
