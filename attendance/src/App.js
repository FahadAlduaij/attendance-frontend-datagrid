import React from "react";
import "./App.css";

// components
import NavBar from "./components/NavBar";
import RoutesComponent from "./routes";

// components

function App() {
	return (
		<div className="App">
			<NavBar />

			<RoutesComponent />
		</div>
	);
}

export default App;
