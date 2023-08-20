import { createTheme } from "@mui/material"

export const theme = createTheme({
    palette: {
        background: {
            main: "#fbfbfb"
        },
        success: {
            main: '#68C37C',
            hover: '#47B15E',
        },
        error: {
            main: '#ff0000',
            hover: '#f30000'
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
                main: "#f29129"
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

    border: '1px solid #e0e0e0',

    components: {
        MuiTextField: {
			variants: [
				{
					props: { variant: 'outlined' },
					style: {
						backgroundColor: 'white',
					},
				},
			],
        },
        MuiTableRow: {
            styleOverrides: {
				root: {
					cursor: 'pointer'
				},
      		},
        },
        MuiTableCell: {
            styleOverrides: {
				root: {
					cursor: 'pointer'
				},
      		},
        },
    }
})