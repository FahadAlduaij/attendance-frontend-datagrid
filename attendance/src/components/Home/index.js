import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { Typography } from "@mui/material";

// components
import TableData from "./TableData";

function HomePage() {
	const location = useLocation();

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Typography variant="h4" mt={5} mb={3}>
				Attendance
			</Typography>
			<TableData />
		</div>
	);
}

export default observer(HomePage);
