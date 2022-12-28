import { Routes, Route } from 'react-router-dom'
// pages
import Navigation from './components/Navigation'
import SettingsPage from './pages/SettingsPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import UserHomePage from './pages/UserHomePage'

import './assets/scss/App.scss'
import AddMaterialPage from './pages/AddMaterialPage'


function App() {
	return (
		<div className="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<SignInPage />} /> {/* Sign in = Homepage */}
				<Route path="/sign-up" element={<SignUpPage />} />
				<Route path="/user/:id" element={<UserHomePage />} />
				<Route path="/user/:id/settings" element={<SettingsPage />} />
				<Route path="/user/:id/settings/add-material" element={<AddMaterialPage/>} />
			</Routes>
		</div>
	)
}

export default App
