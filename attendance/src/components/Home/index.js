import React from "react";
import { useLocation, useParams } from "react-router-dom";

// stores
import profileStore from "../../stores/profileStore";

function HomePage() {
	const location = useLocation();

	return <div>Home Page {location.state}</div>;
}

export default HomePage;
