import React, { useState } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import {
	TextField,
	Grid,
	Box,
	Stack,
	Typography,
	Container,
	Button,
	Avatar,
	InputAdornment,
	IconButton,
	Paper,
} from "@mui/material";

// icons
import Visibility from "@mui/icons-material/Visibility";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// components
import theme from "../../assets/theme";
import Spinner from "../../components/Spinner";

// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/profileStore";

function Register() {
	const [userData, setUserData] = useState({
		username: "",
		password: "",
		name: "",
	});
	const [confirmPassword, setConfirmPassword] = useState("");
	const [passwordType, setPasswordType] = useState("password");
	const [showPassword, setShowPassword] = useState(false);
	const [notConfirmedPassword, setNotConfirmedPassword] = useState(false);
	const [notConfirmedPasswordText, setNotConfirmedPasswordText] = useState("");
	const [open, setOpen] = useState(false);
	const [errorStatus, setErrorStatus] = React.useState(false);

	// useEffect(() => {
	// 	if (authStore.user) {
	// 		return navigate("/home");
	// 	}
	// }, []);

	const handleToggle = () => {
		setOpen(!open);
	};

	const handleChange = (event) => {
		setUserData({ ...userData, [event.target.name]: event.target.value });
	};

	const handleChangeConfirmPassword = (event) => {
		setConfirmPassword(event.target.value);
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);

		if (!showPassword) {
			setPasswordType("text");
		} else {
			setPasswordType("password");
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (confirmPassword !== userData.password) {
			setNotConfirmedPassword(true);
			setNotConfirmedPasswordText("Password's not match.");
		} else {
			setNotConfirmedPassword(false);
			setNotConfirmedPasswordText("");
			authStore.register(userData, setErrorStatus);
			profileStore.fetchProfiles();
		}
	};

	return (
		<Container
			component="main"
			maxWidth="xxl"
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				backgroundColor: theme.palette.dark,
			}}
		>
			<Spinner open={authStore.isLoading} />

			<Paper
				elevation={3}
				sx={{
					width: { sm: "100%", md: "50%", lg: "30%", xl: "25%" },
					p: 6,
				}}
			>
				<Stack
					direction={"column"}
					justifyContent={"center"}
					alignItems={"center"}
					spacing={1}
				>
					<Avatar sx={{ m: 1, backgroundColor: theme.palette.primary.main }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h4" color={"primary"}>
						Register
					</Typography>

					{errorStatus && (
						<Typography
							color={theme.palette.warning.main}
							m={1}
							alignSelf={"center"}
							justifySelf={"center"}
						>
							Username is already exist.
						</Typography>
					)}
				</Stack>

				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<TextField
						onChange={handleChange}
						value={userData.username}
						margin="normal"
						required
						fullWidth
						id="username"
						label="Username"
						name="username"
						autoFocus
					/>
					<TextField
						onChange={handleChange}
						value={userData.name}
						margin="normal"
						required
						fullWidth
						name="name"
						label="Full Name"
						type="text"
						id="name"
					/>

					<TextField
						onChange={handleChange}
						value={userData.password}
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type={passwordType}
						id="password"
						error={notConfirmedPassword}
						helperText={notConfirmedPasswordText}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					<TextField
						onChange={handleChangeConfirmPassword}
						value={confirmPassword}
						margin="normal"
						required
						fullWidth
						name="confirmPassword"
						label="Confirm Password"
						type={passwordType}
						id="confirmPassword"
						error={notConfirmedPassword}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{
							my: 2,
						}}
					>
						Register
					</Button>

					<Grid container alignItems={"center"} justifyContent={"center"}>
						<Grid item>
							<Typography
								style={{ color: theme.palette.info.main }}
								variant="body2"
							>
								Already have an account?
							</Typography>
						</Grid>
						<Grid item>
							<Link to={"/"} style={{ color: theme.palette.info.main }}>
								<Typography variant="body2" ml={0.4} fontWeight={600}>
									Login
								</Typography>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Container>
	);
}

export default observer(Register);
