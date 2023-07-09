import { createTheme } from "@mui/material"

export const theme = createTheme({
	palette: {
		background: {
			main: "#fbfbfb"
		},
		success: {
			main: '#68C37C'
		},
		error: {
			main: '#ff0000'
		},

		color: {
			green: {
				main: '#68C37C',
				hover: '#47B15E',
			},
			blue: {
				main: '#68A5EC',
				hover: '#3B8AE6'
			},
			orange: {
				main: "#DC822F"
			},
			yellow: {
				main: "#CBC309"
			},
			grey: {
				light: '#e0e0e0',
				dark: '#808080',
			},
		},
	},
})