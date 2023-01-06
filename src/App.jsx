import { Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'

// pages
import Navigation from './components/Navigation'
import SettingsPage from './pages/SettingsPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import UserHomePage from './pages/UserHomePage'
import CreateProjectPage from './pages/CreateProjectPage'
import CreateMaterialPage from './pages/CreateMaterialPage'
import ProjectPage from './pages/ProjectPage'
import AllProjectsPage from './pages/AllProjectsPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ErrorPage from './pages/ErrorPage'

import './assets/scss/App.scss'



function App() {
	return (
		<div className="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<SignInPage />} /> {/* Sign in = Homepage */}
				<Route path="/sign-up" element={<SignUpPage />} />
				<Route path="/reset-password" element={<ForgotPasswordPage />} />
				<Route path="/user/:id" element={<UserHomePage />} />
				<Route path="/user/:id/settings" element={<SettingsPage />} />
				<Route path="/user/:id/settings/create-material" element={<CreateMaterialPage/>} />
				<Route path="/user/:id/create-project" element={<CreateProjectPage />} />
				<Route path="/user/:id/project" element={<ProjectPage />} />
				<Route path="/user/:id/projects" element={<AllProjectsPage />} />
				<Route path="*" element={<ErrorPage/>} />
			</Routes>

			<ReactQueryDevtools position='bottom-left' />
		</div>
	)
}

export default App
