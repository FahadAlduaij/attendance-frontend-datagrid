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
import { Stack } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

// components
import ThemeColors from "../../theme/ThemeColors";

// stores
import authStore from "../../stores/authStore";
import profileStore from "../../stores/profileStore";

function Register() {
	const [userData, setUserData] = React.useState({
		email: "",
		password: "",
		name: "",
	});
	const [open, setOpen] = React.useState(false);
	const navigate = useNavigate();

	const handleToggle = () => {
		setOpen(!open);
	};

	const handleChange = (event) => {
		setUserData({ ...userData, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		authStore.register(userData, navigate, handleToggle);
		profileStore.fetchProfiles();
	};

	return (
		<Container component="main" maxWidth="xs">
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Stack
					direction={"row"}
					justifyContent={"center"}
					alignItems={"center"}
					spacing={1}
				>
					<Avatar sx={{ m: 1, backgroundColor: ThemeColors.primary }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Register
					</Typography>
				</Stack>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						onChange={handleChange}
						value={userData.email}
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email"
						name="email"
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
						Register
					</Button>
					<Grid container>
						<Grid item xs>
							<Link to={"/register"} style={{ color: ThemeColors.primary }}>
								<Typography variant="overline">Forgot password?</Typography>
							</Link>
						</Grid>
						<Grid item>
							<Link to={"/"} style={{ color: ThemeColors.primary }}>
								<Typography variant="overline">
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
