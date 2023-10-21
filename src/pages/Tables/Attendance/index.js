import React from "react";
import { observer } from "mobx-react";
import { Box, Container, Typography } from "@mui/material";

// components
import DataGrid from "../DataGrid";
import theme from "../../../assets/theme";
import Spinner from "../../../components/Spinner";

// store
import profileStore from "../../../stores/profileStore";

function Attendance({ type }) {
	return (
		<>
			<Spinner open={profileStore.isLoading} />

			{!profileStore.isLoading && (
				<Container maxWidth={"xl"}>
					<Typography
						textAlign={"center"}
						variant="h3"
						m={5}
						color={theme.palette.secondary.main}
					>
						{type ? type : "Home"}
					</Typography>

					<DataGrid type={type} />
				</Container>
			)}
		</>
	);
}

export default observer(Attendance);
