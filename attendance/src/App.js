import React from "react";
import { observer } from "mobx-react";
import "./App.css";
import { CssBaseline } from "@mui/material";

// components
import SignedRoutes from "./routes/SignedRoutes";
import NotSignedRoutes from "./routes/NotSignedRoutes";
import NavBar from "./components/NavBar";

// stores
import authStore from "./stores/authStore";

function App() {
	return (
		<CssBaseline>
			{authStore.isSigned ? (
				<>
					<NavBar />
					<SignedRoutes />
				</>
			) : (
				<NotSignedRoutes />
			)}
		</CssBaseline>
	);
}

export default observer(App);
