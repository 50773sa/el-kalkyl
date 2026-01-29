import { useEffect, useState } from 'react'
import { useAuthContext } from '../contexts/AuthContextProvider'
import useViewStore from '../store/useViewStore'
import useStreamCollection from '../hooks/useStreamCollection'
import LoadingBackdrop from '../components/LoadingBackdrop'
import Cards from '../components/userHome/Cards'
import HomeTable from '../components/userHome/HomeTable'
// mui
import Grid from "@mui/material/Grid"
import Container from '@mui/material/Container'
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined'
import DataSaverOnOutlinedIcon from '@mui/icons-material/DataSaverOnOutlined'

const UserHomepage = () => {
	const [completedProjects, setCompletedProjects] = useState(0)
    const { currentUser, userName } = useAuthContext()
  	const { data: projects, isLoading} = useStreamCollection('projects')
	const setIsCurrentView = useViewStore((state) => state.setIsCurrentView)

    useEffect(() => {
		if (isLoading) {
			return
		}
        let proj = projects?.filter(project => project?.completed === true)
        setCompletedProjects(proj?.length)
	
    }, [completedProjects, projects, currentUser])


	return (
        <Container>
            <div className='wrapper' id='home'>

				{isLoading && <LoadingBackdrop />}

				{!isLoading && projects && completedProjects && (

					<Grid container spacing={2}>
						<Grid
                            size={{
                                xs: 6,
                                md: 3
                            }}>
							<Cards
								onClick={() => (navigate(`/user/${currentUser.uid}/projects`), setIsCurrentView({ collection: true, createDoc: false }))}
								titleKey='projects'
								numberOfProjects={projects?.length ? projects.length : '0'}
								subtitleKey='projects'
								cardIcon={<SummarizeOutlinedIcon sx={{ fontSize: { sm: '2.5rem', lg: '4rem'}, color: '#68A5EC' }}/>}
								color="#68A5EC"
							/>
						</Grid>


						<Grid
                            size={{
                                xs: 6,
                                md: 3
                            }}>
							<Cards 
								onClick={() => (navigate(`/user/${currentUser.uid}/projects`), setIsCurrentView({ collection: true, createDoc: false } ))} 
								titleKey='newProject'
								subtitleKey="newProject"
								cardIcon={<DataSaverOnOutlinedIcon sx={{ fontSize: { sm: '2.5rem', lg: '4rem'}, color: '#68C37C' }}/>}
								color="#68C37C"
							/>
						</Grid>


						<Grid
                            size={{
                                xs: 6,
                                md: 3
                            }}>
							<Cards 
								onClick={() => (navigate(`/user/${currentUser.uid}/material`), setIsCurrentView({ collection: true, createDoc: false }) )}					
								titleKey='material'
								subtitleKey="material"
								cardIcon={<SummarizeOutlinedIcon sx={{ fontSize: { sm: '2.5rem', lg: '4rem'}, color: '#CBC309' }}/>}
								color="#CBC309"
							/>
						</Grid>

						<Grid
                            size={{
                                xs: 6,
                                md: 3
                            }}>
							<Cards 
								onClick={() => (navigate(`/user/${currentUser.uid}/material`), setIsCurrentView({ collection: false, createDoc: true }) )}					
								titleKey='newMaterial'
								subtitleKey="newMaterial"
								cardIcon={<DataSaverOnOutlinedIcon sx={{ fontSize: { sm: '2.5rem', lg: '4rem'}, color: '#DC822F' }}/>}
								color="#DC822F"
							/>
						</Grid>

						<Grid sx={{ height: "60vh", borderRadius: "0 0 10px 10px"}} size={12}>
							<Grid padding={0} size={12}>
								<HomeTable 
									projects={projects} 
								/>
							</Grid>
						</Grid>
					</Grid>
				)}
			</div>
        </Container>
    );
}

export default UserHomepage