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
		<Routes>
			<Route path="/home" element={<HomePage />} />
			<Route path="/register" element={<Register />} />
			<Route exact path="/" element={<Login />} />
			<Route path="*" element={!authStore.user ? <Login /> : <NotFound />} />
		</Routes>
	);
}

export default observer(RoutesPage);
