import { Routes, Route } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from 'react-toastify'
// pages
import Navigation from './components/Navigation'
import SettingsPage from './pages/SettingsPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import UserHomePage from './pages/UserHomePage'
import UserHomePageCopy from './pages/UserHomePageCopy'
import CreateProjectPage from './pages/CreateProjectPage'
import EditProjectPage from './pages/EditProjectPage'
import CreateMaterialPage from './pages/CreateMaterialPage'
import EditMaterialPage from './pages/EditMaterialPage'
import ProjectPage from './pages/ProjectPage'
import AllProjectsPage from './pages/AllProjectsPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ErrorPage from './pages/ErrorPage'
import RequireAuth from './components/RequireAuth'

import './assets/scss/App.scss'



function App() {
	return (
		<div className="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<SignInPage />} /> 
				<Route path="/sign-up" element={<SignUpPage />} />
				<Route path="/reset-password" element={<ForgotPasswordPage />} />

				{/**
				 * 	Protected routes
				 */}

				<Route path="/user/:id" element={
					<RequireAuth>
						<UserHomePageCopy />
						{/* <UserHomePage /> */}
					</RequireAuth>
				} />

				<Route path="/user/:id/settings" element={
					<RequireAuth>
						<SettingsPage />
					</RequireAuth>
				} /> 

				<Route path="/user/:id/settings/create-material" element={
					<RequireAuth>
						<CreateMaterialPage />
					</RequireAuth>
				} />

				<Route path="/user/:id/settings/edit-material" element={
					<RequireAuth>
						<EditMaterialPage />
					</RequireAuth>
				} />

				<Route path="/user/:id/create-project" element={
					<RequireAuth>
						<CreateProjectPage />
					</RequireAuth>
				} />

				<Route path="/user/:id/project/:projectId" element={
					<RequireAuth>
						<ProjectPage />
					</RequireAuth>
				} />

				<Route path="/user/:id/project/:projectId/edit" element={
					<RequireAuth>
						<EditProjectPage />
					</RequireAuth>
				} />

				<Route path="/user/:id/projects" element={
					<RequireAuth>
						<AllProjectsPage />
					</RequireAuth>
				} />

				<Route path="*" element={<ErrorPage/>} />
			</Routes>

			<ReactQueryDevtools position='bottom-left' />
			<ToastContainer autoClose={2000} />
		</div>
	)
}

export default App
