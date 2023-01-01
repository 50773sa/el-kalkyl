import Container from '@mui/material/Container'
import UserHome from '../components/UserHome'
import useGetUsers from '../hooks/useGetUsers'

const UserHomepage = () => {
	const { data } = useGetUsers()

	console.log('usersQuery', data)

	return (
		<Container>
				<UserHome />			
		</Container>
	)
}

export default UserHomepage