import { Routes, Route } from 'react-router-dom'
// pages
import Navigation from './components/Navigation'
import Homepage from './pages/Homepage'
import ProfilePage from './pages/ProfilePage'

import './assets/scss/App.scss'


function App() {
	return (
		<div className="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/profile" element={<ProfilePage />} />
			</Routes>
		</div>
	)
}

export default App
