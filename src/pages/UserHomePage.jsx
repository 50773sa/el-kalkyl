import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import UserHome from '../components/UserHome'
import { useAuthContext } from '../contexts/AuthContextProvider'
import LoadingBackdrop from '../components/LoadingBackdrop'

const UserHomepage = () => {
	const { currentUser } = useAuthContext()


	return (
		<Container>
				<UserHome />			
		</Container>
	)
}

export default UserHomepage