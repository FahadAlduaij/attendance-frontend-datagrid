import React from "react";
import { observer } from "mobx-react";
import { Routes, Route, Navigate } from "react-router-dom";

// components
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";
import HomePage from "../components/Home";
import NotFound from "./NotFound";

// stores
import authStore from "../stores/authStore";

function RoutesPage() {
	return (
		<div>
			<Routes>
				<Route path="/register" element={<Register />} />
				<Route path="/Login" element={<Login />} />
				<Route exact path="/" element={<HomePage />} />
				<Route path="*" element={<NotFound />} />
				{/* <Route path="*" element={<Navigate to={"/login"} />} /> */}
			</Routes>
		</div>
	);
}

export default observer(RoutesPage);
