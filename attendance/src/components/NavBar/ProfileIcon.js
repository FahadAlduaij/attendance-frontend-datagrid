import React from "react";
import { useNavigate } from "react-router-dom";

// MUI
import {
	Stack,
	Box,
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
import ThemeColors from "../../theme/ThemeColors";

// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/profileStore";

function ProfileIcon() {
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const navigate = useNavigate();

	const currentProfile = authStore.isSigned
		? profileStore.profiles.find(
				(profile) => profile._id === authStore.user._id
		  )
		: null;

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
							<KeyboardArrowDownIcon sx={{ color: ThemeColors.third }} />
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
				</Box>
			)}
		</>
	);
}

export default ProfileIcon;
