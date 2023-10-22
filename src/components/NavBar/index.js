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
	Stack,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

// components
import theme from "../../assets/theme";
import ProfileIcon from "./ProfileIcon";

// stores
import authStore from "../../stores/authStore";

function NavBar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null);

	const navigate = useNavigate();

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleNavigate = (value) => {
		handleCloseNavMenu();
		navigate(`/${value}`);
	};

	return (
		<>
			{authStore?.user ? (
				<AppBar
					position="static"
					enableColorOnDark={true}
					sx={{
						backgroundColor: theme.palette.secondary.main,
					}}
				>
					<Container maxWidth="xl">
						<Toolbar disableGutters>
							<Stack
								flexGrow={1}
								direction={"row"}
								justifyContent={"space-between"}
								alignItems={"center"}
							>
								{/* Small Screen */}
								<Box sx={{ display: { xs: "flex", md: "none" } }}>
									<IconButton
										aria-label="account of current user"
										aria-controls="menu-appbar"
										aria-haspopup="true"
										onClick={handleOpenNavMenu}
										color={"primary"}
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
										<MenuItem onClick={() => handleNavigate("")}>
											<Typography textAlign="center">Home</Typography>
										</MenuItem>
										<MenuItem onClick={() => handleNavigate("permission")}>
											<Typography textAlign="center">Permission</Typography>
										</MenuItem>
										<MenuItem onClick={() => handleNavigate("medical")}>
											<Typography textAlign="center">Medical</Typography>
										</MenuItem>
										<MenuItem onClick={() => handleNavigate("emergency")}>
											<Typography textAlign="center">Emergency</Typography>
										</MenuItem>
									</Menu>
								</Box>
								<Box
									flexGrow={1}
									sx={{
										display: { xs: "block", md: "none" },
									}}
								>
									<Typography
										textAlign={"center"}
										variant="h6"
										color={"primary"}
										sx={{
											fontWeight: 700,
											fontSize: "1.6rem",
										}}
									>
										Attendance
									</Typography>
								</Box>

								{/* Large Screen */}
								<Stack
									flexGrow={1}
									direction={"row"}
									justifyContent={"flex-start"}
									spacing={3}
									sx={{ display: { xs: "none", md: "flex" } }}
								>
									<Typography
										onClick={() => handleNavigate("")}
										color="primary"
										sx={{
											fontWeight: "bold",
											fontSize: "1.8rem",
											cursor: "pointer",
										}}
									>
										Attendance
									</Typography>
									{/* <Button
										onClick={() => handleNavigate("permission")}
										color="primary"
										sx={{
											fontWeight: "bold",
											fontSize: "1rem",
											":hover": {
												backgroundColor: theme.palette.primary.main,
												color: theme.palette.secondary.main,
											},
										}}
									>
										Permission
									</Button>
									<Button
										onClick={() => handleNavigate("medical")}
										color="primary"
										sx={{
											fontWeight: "bold",
											fontSize: "1rem",
											":hover": {
												backgroundColor: theme.palette.primary.main,
												color: theme.palette.secondary.main,
											},
										}}
									>
										Medical
									</Button>
									<Button
										onClick={() => handleNavigate("emergency")}
										color="primary"
										sx={{
											fontWeight: "bold",
											fontSize: "1rem",
											":hover": {
												backgroundColor: theme.palette.primary.main,
												color: theme.palette.secondary.main,
											},
										}}
									>
										Emergency
									</Button> */}
								</Stack>

								<Box>
									<ProfileIcon />
								</Box>
							</Stack>
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
