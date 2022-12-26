import { Routes, Route } from 'react-router-dom'
// pages
import Navigation from './components/Navigation'
import SettingsPage from './pages/SettingsPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import UserHomePage from './pages/UserHomePage'

import './assets/scss/App.scss'


function App() {
	return (
		<div className="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<SignInPage />} /> {/* Sign in = Homepage */}
				<Route path="/sign-up" element={<SignUpPage />} />
				<Route path="/user/:id" element={<UserHomePage />} />
				<Route path="/settings/:id" element={<SettingsPage />} />
			</Routes>
		</div>
	)
}

export default App
