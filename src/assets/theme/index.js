import { createTheme } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: {
			main: "#dda448", // Yellow
			// B8E934 Green
			// 0099fc Blue
			// 46c6eb BabyBlue
		},
		secondary: {
			main: "#2b303a", // Black Grey
		},
		info: {
			main: "#8b939c",
		},
		warning: {
			main: "#D0253E",
		},
		success: {
			main: "#519872",
		},
		light: "#FFFFFF",
		dark: "#131921",
	},
	typography: {
		h4: {
			fontWeight: 600,
			fontSize: 28,
			lineHeight: "2rem",
		},
		h5: {
			fontWeight: 100,
			lineHeight: "2rem",
		},
	},
});

export default theme;
