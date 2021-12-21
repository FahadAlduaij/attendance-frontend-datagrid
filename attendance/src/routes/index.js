import React from "react";
import { Routes, Route } from "react-router-dom";

// components
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";

function RoutesComponent() {
	return (
		<div>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/Login" element={<Login />} />
			</Routes>
		</div>
	);
}

export default RoutesComponent;
