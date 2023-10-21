import React from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import {
	Stack,
	InputAdornment,
	IconButton,
	Container,
	Typography,
	Box,
	Grid,
	TextField,
	Button,
	Avatar,
	Paper,
} from "@mui/material";

// icons
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// components
import theme from "../../assets/theme";
import Spinner from "../../components/Spinner";

// stores
import authStore from "../../stores/authStore";

function Login() {
	const [userData, setUserData] = React.useState({
		username: "",
		password: "",
	});
	const [passwordType, setPasswordType] = React.useState("password");
	const [showPassword, setShowPassword] = React.useState(false);
	const [errorStatus, setErrorStatus] = React.useState(false);

	const handleChange = (event) => {
		setUserData({ ...userData, [event.target.name]: event.target.value });
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
		authStore.login(userData, setErrorStatus);
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
				>
					<Avatar sx={{ m: 1, backgroundColor: theme.palette.primary.main }}>
						<VpnKeyIcon />
					</Avatar>

					<Typography component="h1" variant="h4" color={"primary"}>
						Login
					</Typography>

					{errorStatus && (
						<Typography
							color={theme.palette.warning.main}
							m={1}
							alignSelf={"center"}
							justifySelf={"center"}
						>
							Username or password is incorrect.
						</Typography>
					)}
				</Stack>

				<Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
					<TextField
						error={errorStatus}
						onChange={handleChange}
						value={userData.username}
						margin="normal"
						required
						autoFocus={true}
						fullWidth
						id="username"
						label="Username"
						name="username"
					/>

					<TextField
						error={errorStatus}
						onChange={handleChange}
						value={userData.password}
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type={passwordType}
						id="password"
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
						Login
					</Button>

					<Grid container>
						<Grid item xs>
							<Link to={"/register"} style={{ color: theme.palette.info.main }}>
								<Typography fontWeight={600} variant="body2">
									Forgot password?
								</Typography>
							</Link>
						</Grid>

						<Grid item>
							<Typography
								style={{ color: theme.palette.info.main }}
								variant="body2"
							>
								Not registered yet?
							</Typography>
						</Grid>

						<Grid item>
							<Link to={"/register"} style={{ color: theme.palette.info.main }}>
								<Typography ml={0.4} fontWeight={600} variant="body2">
									Register
								</Typography>
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Container>
	);
}

export default observer(Login);
