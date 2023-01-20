import { useParams } from 'react-router-dom'

import Container from '@mui/material/Container'
import UserHome from '../components/UserHome'
import useGetUser from '../hooks/useGetUser'
import useStreamDoc from '../hooks/useStreamDoc'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../contexts/AuthContextProvider'


const UserHomepage = () => {
	const { currentUser } = useAuthContext()
	const { data } = useGetUser()
	console.log('data', data)

	return (
		<Container>
			
			<UserHome  />			
			
		</Container>
	)
}

export default UserHomepage