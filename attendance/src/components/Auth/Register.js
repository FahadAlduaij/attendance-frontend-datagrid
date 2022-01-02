import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FormControl, Input, InputLabel, Stack } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// components
import ThemeColors from "../../theme/ThemeColors";

// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/profileStore";

function Register() {
	const [userData, setUserData] = React.useState({
		username: "",
		password: "",
		name: "",
	});
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [passwordType, setPasswordType] = React.useState("password");
	const [showPassword, setShowPassword] = React.useState(false);
	const [notConfirmedPassword, setNotConfirmedPassword] = React.useState(false);
	const [notConfirmedPasswordText, setNotConfirmedPasswordText] =
		React.useState("");
	const [open, setOpen] = React.useState(false);
	const navigate = useNavigate();

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

	const handleCheckIfPasswordMatch = () => {
		if (confirmPassword !== userData.password) {
			setNotConfirmedPassword(true);
			setNotConfirmedPasswordText("Password's not match.");
		} else {
			setNotConfirmedPassword(false);
			setNotConfirmedPasswordText("");
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		handleCheckIfPasswordMatch();
		if (!notConfirmedPassword) {
			authStore.register(userData, navigate, handleToggle);
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
				backgroundColor: ThemeColors.primary,
			}}
		>
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
			>
				<CircularProgress color="inherit" />
			</Backdrop>

			<Box
				sx={{
					width: { sm: "100%", md: "50%", lg: "30%" },
					backgroundColor: ThemeColors.light,
					borderRadius: 2,
					py: 10,
					px: 5,
				}}
			>
				<Stack
					direction={"column"}
					justifyContent={"center"}
					alignItems={"center"}
					spacing={1}
				>
					<Avatar sx={{ m: 1, backgroundColor: ThemeColors.secondary }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5" color={ThemeColors.primary}>
						Register
					</Typography>
				</Stack>

				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
							mt: 3,
							mb: 2,
							backgroundColor: ThemeColors.secondary,
							":hover": { backgroundColor: ThemeColors.secondaryHover },
						}}
					>
						Register
					</Button>

					<Grid container>
						<Grid item ml={"auto"}>
							<Link to={"/"} style={{ color: ThemeColors.third }}>
								<Typography variant="body2">
									{"I already have an account."}
								</Typography>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}

export default Register;
