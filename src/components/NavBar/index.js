import React from "react";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

// MUI
import {
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Button,
	MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

// components
import ThemeColors from "../../theme/ThemeColors";
import ProfileIcon from "./ProfileIcon";

// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/profileStore";

function NavBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const navigate = useNavigate();

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleGoPage = (value) => {
		handleCloseNavMenu();
		navigate(`/${value}`);
	};

	return (
		<>
			{authStore.isSigned ? (
				<AppBar
					position="static"
					enableColorOnDark={true}
					sx={{
						backgroundColor: ThemeColors.primary,
						borderColor: ThemeColors.primary,
					}}
				>
					<Container maxWidth="xl">
						<Toolbar disableGutters>
							<Typography
								variant="h6"
								noWrap
								component="div"
								sx={{
									alignItems: "center",
									justifyContent: "center",
									mr: 2,
									color: ThemeColors.secondary,
									fontWeight: 700,
									fontSize: "1.6rem",
									display: { xs: "none", md: "flex" },
								}}
							>
								Attendance
							</Typography>

							<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
								<IconButton
									size="large"
									aria-label="account of current user"
									aria-controls="menu-appbar"
									aria-haspopup="true"
									onClick={handleOpenNavMenu}
									color="inherit"
								>
									<MenuIcon />
								</IconButton>
								<Menu
									id="menu-appbar"
									anchorEl={anchorElNav}
									anchorOrigin={{
										vertical: "bottom",
										horizontal: "left",
									}}
									keepMounted
									transformOrigin={{
										vertical: "top",
										horizontal: "left",
									}}
									open={Boolean(anchorElNav)}
									onClose={handleCloseNavMenu}
									sx={{
										display: { xs: "block", md: "none" },
									}}
								>
									<MenuItem onClick={() => handleGoPage("home")}>
										<Typography textAlign="center">Home</Typography>
									</MenuItem>
									<MenuItem onClick={() => handleGoPage("permission")}>
										<Typography textAlign="center">Permission</Typography>
									</MenuItem>
									<MenuItem onClick={() => handleGoPage("medical")}>
										<Typography textAlign="center">Medical</Typography>
									</MenuItem>
									<MenuItem onClick={() => handleGoPage("emergency")}>
										<Typography textAlign="center">Emergency leave</Typography>
									</MenuItem>
								</Menu>
							</Box>

							<Typography
								variant="h6"
								noWrap
								component="div"
								sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
							>
								Attendance
							</Typography>

							<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
								<Button
									onClick={() => handleGoPage("home")}
									sx={{
										m: 2,
										color: ThemeColors.secondary,
										fontWeight: 700,
										display: "block",
										":hover": {
											backgroundColor: ThemeColors.secondary,
											color: ThemeColors.primary,
										},
									}}
								>
									Home
								</Button>
								<Button
									onClick={() => handleGoPage("permission")}
									sx={{
										m: 2,
										color: ThemeColors.secondary,
										fontWeight: 700,
										display: "block",
										":hover": {
											backgroundColor: ThemeColors.secondary,
											color: ThemeColors.primary,
										},
									}}
								>
									Permission
								</Button>
								<Button
									onClick={() => handleGoPage("medical")}
									sx={{
										m: 2,
										color: ThemeColors.secondary,
										fontWeight: 700,
										display: "block",
										":hover": {
											backgroundColor: ThemeColors.secondary,
											color: ThemeColors.primary,
										},
									}}
								>
									Medical
								</Button>
								<Button
									onClick={() => handleGoPage("emergency")}
									sx={{
										m: 2,
										color: ThemeColors.secondary,
										fontWeight: 700,
										display: "block",
										":hover": {
											backgroundColor: ThemeColors.secondary,
											color: ThemeColors.primary,
										},
									}}
								>
									Emergency leave
								</Button>
							</Box>

							<ProfileIcon />
						</Toolbar>
					</Container>
				</AppBar>
			) : (
				<h1></h1>
			)}
		</>
	);
}

export default observer(NavBar);
