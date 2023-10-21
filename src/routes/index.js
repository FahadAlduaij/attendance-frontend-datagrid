import React from "react";
import { observer } from "mobx-react";
import { Routes, Route, Navigate } from "react-router-dom";

// pages
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Attendance from "../pages/Tables/Attendance";
import Profile from "../pages/Profile";

// stores
import authStore from "../stores/authStore";

function RoutesPage() {
	return (
		<Routes>
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />

			{authStore.user && (
				<Route path="/">
					<Route index element={<Attendance />} />
					<Route
						path="permission"
						element={<Attendance type={"Permission"} />}
					/>
					<Route path="medical" element={<Attendance type={"Medical"} />} />
					<Route
						path="emergency"
						element={<Attendance type={"Emergency leave"} />}
					/>
					<Route path="/profile" element={<Profile />} />
				</Route>
			)}

			{authStore.user ? (
				<Route path="*" element={<Navigate to={"/"} replace={true} />} />
			) : (
				<Route path="*" element={<Navigate to={"/login"} replace={true} />} />
			)}
		</Routes>
	);
}

export default observer(RoutesPage);
