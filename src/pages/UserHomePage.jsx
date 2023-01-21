import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContextProvider'
import useStreamDoc from '../hooks/useStreamDoc'
import useStreamCollection from '../hooks/useStreamCollection'
import LoadingBackdrop from '../components/LoadingBackdrop'
// mui
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SettingsIcon from '@mui/icons-material/Settings'
import Container from '@mui/material/Container'



const UserHomepage = () => {
	const [completedProjects, setCompletedProjects] = useState(0)
    const { currentUser, userName } = useAuthContext()
    const { data, loading } = useStreamDoc('users', currentUser.uid)
    const { data: projects } = useStreamCollection('projects')
    const navigate = useNavigate()


    useEffect(() => {
        let proj = projects?.filter(project => project.completed === true)
        setCompletedProjects(proj.length)

    }, [completedProjects, projects, currentUser])


	return (
		<Container>
			<div className='wrapper' id='home'>

				{loading && <LoadingBackdrop />}

				{/** 
				 * Profile button and name
				 */}

				<Card 
					onClick={() => navigate(`/user/${currentUser.uid}/settings`)} 
					sx={{ 
						display: 'flex',
						padding: '24px',
						marginBottom: '2rem',
						position: 'relative',
						backgroundColor: '#7ACFFF'
					}}
				>

					<CardContent 
						sx={{ 
							display: 'flex', 
							flexDirection: 'column', 
							justifyContent: 'center', 
							width: '100%', 
							cursor: 'pointer'
						}}
					>
						{!loading && (
							<Typography variant="h6" component="div" textAlign='center' >
								{data?.company ? data?.company : "Profil"}
							</Typography>
						)}

						<SettingsIcon sx={{ position: 'absolute', right: '1rem', bottom: '1rem'}}/>
					</CardContent>
				</Card>

				<Typography 
					variant="h7" 
					component="div" 
					textAlign='center' 
					marginBottom='3rem'
				> 
					<em>{userName}</em>
				</Typography>

				<br/>

				{/** 
				 *  Number of projects
				 */}

				<Box 
					sx={{ 
						display: 'flex', 
						justifyContent: 'space-between', 
						paddingLeft: '1rem', 
						paddingRight: '1rem'
					}}
				>
					<Typography variant="h7" component="span" textAlign='center' marginBottom='2rem'>
					<strong>{projects?.length ? projects.length : "0"}</strong>  
					<br/> Projekt
					</Typography>

					<Typography variant="h7" component="span" textAlign='center'>
						<strong>{completedProjects}</strong>  
						<br/> Aktiva projekt
					</Typography>
				</Box>

				{/** 
				 *  Navigation buttons 
				 */}

				<Box 
					sx={{ 
						display: 'flex', 
						flexDirection: 'row', 
						justifyContent: 'space-between', 
						gap: '1rem', 
						marginBottom: '1rem',
						cursor: 'pointer'
					}}
				>
					<Card 
						onClick={() => navigate(`/user/${currentUser.uid}/projects`)}
						sx={{ 
							width: '80%',
							height: '100px', 
							padding: '1.5rem',
							backgroundColor: '#DC822F',
						}}
					>
						<CardContent>
							<Typography variant="h8" component="div" textAlign='center'>
								Projekt
							</Typography>
						</CardContent>
					</Card>

					<Card 
						onClick={() => console.log('Under uppbyggnad')} 
						sx={{
							width: '20%',
							height: '100px', 
							padding: '1.5rem',
							backgroundColor: '#CBC309',
							cursor: 'auto',
						}}
					>
						<CardContent>
							<Typography variant="h8" component="div" textAlign='center'>
								-
							</Typography>
						</CardContent>
					</Card>
				</Box>

				<Box
					sx={{ 
						display: 'flex', 
						flexDirection: 'row', 
						justifyContent: 'space-between', 
						gap: '1rem',
					}}
				>
					<Card 
						onClick={() => navigate(`/user/${currentUser.uid}/settings/create-material`)} 
						sx={{ 
							width: '20%', 
							height: '100px', 
							padding: '1.5rem', 
							display:' flex', 
							justifyContent: 'center', 
							alignItems: 'center', 
							backgroundColor: '#68A5EC',
							cursor: 'pointer', 
						}}
					>
						<CardContent className='center'>
							<AddCircleOutlineIcon />
						</CardContent>

					</Card>

					<Card 
						onClick={() => navigate(`/user/${currentUser.uid}/create-project`)} 
						sx={{
							width: '80%', 
							height: '100px', 
							padding: '1.5rem', 
							backgroundColor: '#68C37C',
							cursor: 'pointer',
						}}
					>
						<CardContent>
							<Typography variant="h8" component="div" textAlign='center'>
								Ny beräkning
							</Typography>
						</CardContent>

					</Card>
				</Box>
			</div>     
		</Container>
	)
}

export default UserHomepage