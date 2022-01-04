import React from "react";
import { observer } from "mobx-react";
import { Routes, Route, Navigate } from "react-router-dom";

// components
import HomePage from "../components/Home";
import NotFound from "./NotFound";
import Profile from "../components/Profile";

function SignedRoutes() {
	return (
		<Routes>
			<Route path="/profile" element={<Profile />} />
			<Route path="/home" element={<HomePage />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default observer(SignedRoutes);
