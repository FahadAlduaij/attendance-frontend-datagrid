import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Stack } from "@mui/material";

// components
import ThemeColors from "../../theme/ThemeColors";

// stores
import authStore from "../../stores/authStore";

function Login() {
	const [userData, setUserData] = React.useState({
		username: "",
		password: "",
	});
	const navigate = useNavigate();

	const handleChange = (event) => {
		setUserData({ ...userData, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		authStore.login(userData);
		navigate("/");
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
					<Avatar sx={{ m: 1, backgroundColor: ThemeColors.primary }}>
						<VpnKeyIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
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
							<Link to={"/register"} style={{ color: ThemeColors.primary }}>
								<Typography variant="overline">Forgot password?</Typography>
							</Link>
						</Grid>
						<Grid item>
							<Typography
								style={{ color: ThemeColors.primary }}
								variant="overline"
							>
								Not registered yet?
							</Typography>
						</Grid>
						<Grid item>
							<Link to={"/register"} style={{ color: ThemeColors.primary }}>
								<Typography marginLeft={0.3} variant="overline">
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
