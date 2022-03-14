import React from "react";
import { observer } from "mobx-react";
import { Routes, Route } from "react-router-dom";

// components
import Attendance from "../components/Tables/Attendance";
import NotFound from "./NotFound";
import Profile from "../components/Profile";

function SignedRoutes() {
	return (
		<Routes>
			<Route path="/home" element={<Attendance />} />
			<Route path="/permission" element={<Attendance type={"Permission"} />} />
			<Route path="/medical" element={<Attendance type={"Medical"} />} />
			<Route
				path="/emergency"
				element={<Attendance type={"Emergency leave"} />}
			/>
			<Route path="/profile" element={<Profile />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default observer(SignedRoutes);
