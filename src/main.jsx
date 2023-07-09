import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContextProvider'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'
import App from './App'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 3,
			cacheTime: 1000 * 60 * 60 * 45,
		}
	}
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AuthContextProvider>
					<ThemeProvider theme={theme}>
						<App />
					</ThemeProvider>
				</AuthContextProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>,
)
