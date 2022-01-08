import React from "react";
import { observer } from "mobx-react";
import { Routes, Route, Navigate } from "react-router-dom";

// components
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";

function NotSignedRoutes() {
	return (
		<Routes>
			<Route exact path="/register" element={<Register />} />
			<Route exact path="/login" element={<Login />} />
			<Route path="*" element={<Navigate to={"/login"} />} />
		</Routes>
	);
}

export default observer(NotSignedRoutes);
