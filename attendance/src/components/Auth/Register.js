import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

// components
import ThemeColors from "../../theme/ThemeColors";

// stores
import authStore from "../../stores/authStore";
import { Stack } from "@mui/material";

function Register() {
	const [userData, setUserData] = useState({
		username: "",
		password: "",
		profile: {
			name: "",
		},
	});

	const handleChange = (event) => {
		setUserData({ ...userData, [event.target.name]: event.target.value });
	};

	const handleProfile = (event) => {
		setUserData({ ...userData, profile: { name: event.target.value } });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(userData);
	};
	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
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
					<Avatar sx={{ m: 1, bgcolor: ThemeColors.primary }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
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
						autoComplete="username"
						autoFocus
					/>
					<TextField
						onChange={handleProfile}
						value={userData.profile.name}
						margin="normal"
						required
						fullWidth
						name="name"
						label="Full Name"
						type="text"
						id="name"
						autoComplete="current-name"
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
						autoComplete="current-password"
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
							<Link to={"/login"} style={{ color: ThemeColors.primary }}>
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
