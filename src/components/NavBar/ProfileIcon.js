import React from "react";
import { useNavigate } from "react-router-dom";

// MUI
import {
	Stack,
	IconButton,
	Typography,
	Menu,
	Avatar,
	ListItemIcon,
	MenuItem,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// components
import theme from "../../assets/theme";

// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/profileStore";

function ProfileIcon() {
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const navigate = useNavigate();

	const profile = profileStore.profile;

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleGoToProfile = (e) => {
		e.preventDefault();
		handleCloseUserMenu();
		navigate("/profile");
	};

	const handleLogout = (e) => {
		e.preventDefault();
		handleCloseUserMenu();
		authStore.logout();
		navigate("/login");
	};
	return (
		<>
			{authStore?.user && (
				<>
					<Stack>
						<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
							<Avatar
								alt="User Avatar"
								src={authStore.user.image}
								children={<PersonIcon fontSize="medium" />}
							/>

							<Typography
								marginLeft={1}
								variant="body2"
								color={theme.palette.info.main}
							>
								{authStore.user.name}
							</Typography>
							<KeyboardArrowDownIcon sx={{ color: theme.palette.info.main }} />
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
						<MenuItem onClick={handleGoToProfile}>
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
				</>
			)}
		</>
	);
}

export default ProfileIcon;
