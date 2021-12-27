import React from "react";
import { useLocation, useParams } from "react-router-dom";

// components
import TableData from "./TableData";

// stores
import absentStore from "../../stores/absentStore";
import authStore from "../../stores/authStore";
import { Typography } from "@mui/material";

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

export default HomePage;
