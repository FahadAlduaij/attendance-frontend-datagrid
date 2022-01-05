import React from "react";
import { useLocation } from "react-router-dom";
import { observer } from "mobx-react";
import { Typography } from "@mui/material";

// components
import DataGrid from "./DataGrid";
import ThemeColors from "../../../theme/ThemeColors";

function Home() {
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
			<Typography
				variant="h4"
				mt={5}
				mb={3}
				fontWeight={600}
				sx={{ color: ThemeColors.primary }}
			>
				Home
			</Typography>
			<DataGrid />
		</div>
	);
}

export default observer(Home);
