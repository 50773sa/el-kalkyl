import React from 'react'
import Container from '@mui/material/Container'
import UserHome from '../components/UserHome'
import { useAuthContext } from '../contexts/AuthContextProvider'

const UserHomepage = () => {
	const { currentUser } = useAuthContext()

	console.log('curr id', currentUser.uid)

	return (
		<Container>

			{currentUser && (
				<UserHome />
			)}
			
		</Container>
	)
}

export default UserHomepage