import React from "react";
import "./App.css";
import { CssBaseline } from "@mui/material";

// components
import NavBar from "./components/NavBar";
import RoutesComponent from "./routes";

// components

function App() {
	return (
		<CssBaseline>
			<NavBar />

			<RoutesComponent />
		</CssBaseline>
	);
}

export default App;
