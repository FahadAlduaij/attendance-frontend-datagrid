import React from "react";
import "./App.css";
import { observer } from "mobx-react";
import { ThemeProvider, CssBaseline } from "@mui/material";

// components
import theme from "./assets/theme";
import RoutesPage from "./routes";
import NavBar from "./components/NavBar";
import Spinner from "./components/Spinner";

// stores
import authStore from "./stores/authStore";

function App() {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Spinner open={authStore.isLoading} />

			{authStore.user && <NavBar />}
			<RoutesPage />
		</ThemeProvider>
	);
}

export default observer(App);
