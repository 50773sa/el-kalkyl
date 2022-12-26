import { Routes, Route } from 'react-router-dom'
// pages
import Navigation from './components/Navigation'
import Homepage from './pages/Homepage'
import ProfilePage from './pages/ProfilePage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'

import './assets/scss/App.scss'


function App() {
	return (
		<div className="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/user/:id" element={<ProfilePage />} />
				<Route path="/sign-up" element={<SignUpPage />} />
				<Route path="/sign-in" element={<SignInPage />} />
			</Routes>
		</div>
	)
}

export default App
