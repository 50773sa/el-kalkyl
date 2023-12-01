import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContextProvider'
import useViewStore from '../store/useViewStore'
import useStreamDoc from '../hooks/useStreamDoc'
import LoadingBackdrop from '../components/LoadingBackdrop'
import Cards from '../components/userHome/Cards'
import HomeTable from '../components/userHome/HomeTable'

// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Container from '@mui/material/Container'
import useGetAuthColl from '../hooks/useGetAuthColl'
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined'
import DataSaverOnOutlinedIcon from '@mui/icons-material/DataSaverOnOutlined'


const UserHomepage = () => {
	const [completedProjects, setCompletedProjects] = useState(0)
    const { currentUser, userName } = useAuthContext()
    const { data, loading } = useStreamDoc('users', currentUser.uid)
    const { data: projects } = useGetAuthColl('projects')
	const setIsCurrentView = useViewStore((state) => state.setIsCurrentView)
    const navigate = useNavigate()

    useEffect(() => {
		if (loading) {
			return
		}
        let proj = projects?.filter(project => project?.completed === true)
        setCompletedProjects(proj?.length)
	
    }, [completedProjects, projects, currentUser])


	return (
		<Container>
			<div className='wrapper' id='home'>

				{loading  && <LoadingBackdrop />}

				{!loading && projects && completedProjects && (

					<Grid container spacing={2}>
						<Grid xs={6} md={3}>
							<Cards 
								onClick={() => (navigate(`/user/${currentUser.uid}/projects`), setIsCurrentView({ collection: true, createDoc: false }))}
								titleKey='projects'
								numberOfProjects={projects?.length ? projects.length : '0'}
								subtitleKey='projects'
								cardIcon={<SummarizeOutlinedIcon sx={{ fontSize: { sm: '2.5rem', lg: '4rem'}, color: '#68A5EC' }}/>}
								color="#68A5EC"
							/>
						</Grid>


						<Grid xs={6} md={3}>
							<Cards 
								onClick={() => (navigate(`/user/${currentUser.uid}/projects`), setIsCurrentView({ collection: true, createDoc: false } ))} 
								titleKey='newProject'
								subtitleKey="newProject"
								cardIcon={<DataSaverOnOutlinedIcon sx={{ fontSize: { sm: '2.5rem', lg: '4rem'}, color: '#68C37C' }}/>}
								color="#68C37C"
							/>
						</Grid>


						<Grid xs={6} md={3}>
							<Cards 
								onClick={() => (navigate(`/user/${currentUser.uid}/material`), setIsCurrentView({ collection: true, createDoc: false }) )}					
								titleKey='material'
								subtitleKey="material"
								cardIcon={<SummarizeOutlinedIcon sx={{ fontSize: { sm: '2.5rem', lg: '4rem'}, color: '#CBC309' }}/>}
								color="#CBC309"
							/>
						</Grid>

						<Grid xs={6} md={3}>
							<Cards 
								onClick={() => (navigate(`/user/${currentUser.uid}/material`), setIsCurrentView({ collection: false, createDoc: true }) )}					
								titleKey='newMaterial'
								subtitleKey="newMaterial"
								cardIcon={<DataSaverOnOutlinedIcon sx={{ fontSize: { sm: '2.5rem', lg: '4rem'}, color: '#DC822F' }}/>}
								color="#DC822F"
							/>
						</Grid>

						<Grid xs={12} sx={{ height: "60vh", borderRadius: "0 0 10px 10px"}}>
							<Grid xs={12} padding={0}>
								<HomeTable 
									projects={projects} 
								/>
							</Grid>
						</Grid>
					</Grid>
				)}
			</div>
		</Container>
	)
}

export default UserHomepage