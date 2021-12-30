import React from "react";
import { observer } from "mobx-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

// MUI
import {
	Stack,
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Container,
	Avatar,
	Button,
	ListItemIcon,
	MenuItem,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// components
import ThemeColors from "../../theme/ThemeColors";

// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/profileStore";

function NavBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const [anchorElUser, setAnchorElUser] = React.useState(null);

	const currentProfile = authStore.isSigned
		? profileStore.profiles.find(
				(profile) => profile._id === authStore.user._id
		  )
		: null;

	const navigate = useNavigate();

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const goToHome = () => {
		handleCloseNavMenu();
		navigate("/home");
	};

	const handleLogout = (e) => {
		e.preventDefault();
		handleCloseUserMenu();
		authStore.logout();
		navigate("/login");
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
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography textAlign="center">Home</Typography>
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
									onClick={goToHome}
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
									onClick={handleCloseNavMenu}
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
									Vacation
								</Button>
							</Box>

							{authStore.isSigned && (
								<Box sx={{ flexGrow: 0 }}>
									<Stack
										direction={"row"}
										justifyContent={"center"}
										alignItems={"center"}
									>
										<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
											<Avatar
												alt="User Avatar"
												src={authStore.user.image}
												children={<PersonIcon fontSize="medium" />}
											/>

											<Typography
												marginLeft={1}
												variant="body2"
												color={ThemeColors.third}
											>
												{authStore.user.name}
											</Typography>
											<KeyboardArrowDownIcon
												sx={{ color: ThemeColors.third }}
											/>
										</IconButton>
									</Stack>

									<Menu
										sx={{ mt: "45px" }}
										id="menu-appbar"
										anchorEl={anchorElUser}
										anchorOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										keepMounted
										transformOrigin={{
											vertical: "top",
											horizontal: "right",
										}}
										open={Boolean(anchorElUser)}
										onClose={handleCloseUserMenu}
									>
										<MenuItem>
											<ListItemIcon>
												<AccountCircleIcon fontSize="small" />
											</ListItemIcon>
											<Typography textAlign="center">Profile</Typography>
										</MenuItem>
										<MenuItem onClick={handleLogout}>
											<ListItemIcon>
												<Logout fontSize="small" />
											</ListItemIcon>
											<Typography textAlign="center">Logout</Typography>
										</MenuItem>
									</Menu>
								</Box>
							)}
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
