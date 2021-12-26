import React from "react";
import { useLocation, useParams } from "react-router-dom";

// components
import TableData from "./TableData";

// stores
import absentStore from "../../stores/absentStore";
import authStore from "../../stores/authStore";

function HomePage() {
	const location = useLocation();

	const absent = absentStore.absents.filter(
		(item) => item.user._id === authStore.user._id
	);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<h1>Fahad</h1>
			<TableData absent={absent} />
		</div>
	);
}

export default HomePage;
