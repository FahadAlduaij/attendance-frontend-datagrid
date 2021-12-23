import React from "react";
import { observer } from "mobx-react";
import "./App.css";
import { CssBaseline } from "@mui/material";

// components
import RoutesPage from "./routes";
import NavBar from "./components/NavBar";
import authStore from "./stores/authStore";

function App() {
	return (
		<CssBaseline>
			<NavBar />
			<RoutesPage />
		</CssBaseline>
	);
}

export default observer(App);
