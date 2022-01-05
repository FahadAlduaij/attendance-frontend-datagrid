import React from "react";
import { observer } from "mobx-react";
import { Routes, Route, Navigate } from "react-router-dom";

// components
import Home from "../components/Tables/Home";
import Permission from "../components/Tables/Permission";
import Medical from "../components/Tables/Medical";
import Emergency from "../components/Tables/Emergency";
import NotFound from "./NotFound";
import Profile from "../components/Profile";

function SignedRoutes() {
	return (
		<Routes>
			<Route path="/home" element={<Home />} />
			<Route path="/permission" element={<Permission />} />
			<Route path="/medical" element={<Medical />} />
			<Route path="/emergency" element={<Emergency />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default observer(SignedRoutes);
