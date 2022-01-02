import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Stack } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// components
import ThemeColors from "../../theme/ThemeColors";

// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/profileStore";
import absentStore from "../../stores/absentStore";

function Login() {
	const [userData, setUserData] = React.useState({
		username: "",
		password: "",
	});
	const [open, setOpen] = React.useState(false);

	const navigate = useNavigate();

	const handleClose = () => {
		setOpen(false);
	};
	const handleToggle = () => {
		setOpen(!open);
	};

	const handleChange = (event) => {
		setUserData({ ...userData, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		authStore.login(userData, navigate, handleToggle);
		profileStore.fetchProfiles();
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
						<VpnKeyIcon />
					</Avatar>
					<Typography component="h1" variant="h5" color={ThemeColors.primary}>
						User Login
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
						value={userData.password}
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
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
						Login
					</Button>

					<Grid container>
						<Grid item xs>
							<Link to={"/register"} style={{ color: ThemeColors.third }}>
								<Typography variant="body2">Forgot password?</Typography>
							</Link>
						</Grid>
						<Grid item>
							<Typography style={{ color: ThemeColors.third }} variant="body2">
								Not registered yet?
							</Typography>
						</Grid>
						<Grid item>
							<Link to={"/register"} style={{ color: ThemeColors.third }}>
								<Typography marginLeft={0.3} variant="body2">
									Register
								</Typography>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Container>
	);
}

export default Login;
