import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContextProvider'
import useStreamDoc from '../hooks/useStreamDoc'
import LoadingBackdrop from '../components/LoadingBackdrop'
import Cards from '../components/Cards'
// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Container from '@mui/material/Container'
import useGetAuthColl from '../hooks/useGetAuthColl'
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined'
import DataSaverOnOutlinedIcon from '@mui/icons-material/DataSaverOnOutlined';
import HomeTable from '../components/HomeTable'


const UserHomepage = () => {
	const [completedProjects, setCompletedProjects] = useState(0)
    const { currentUser, userName } = useAuthContext()
    const { data, loading } = useStreamDoc('users', currentUser.uid)
    const { data: projects } = useGetAuthColl('projects')
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

				{projects && (

					<Grid container spacing={2}>
						<Grid xs={6} md={3}>
							<Cards 
								onClick={() => navigate(`/user/${currentUser.uid}/projects`)}
								title='Projekt'
								subtitle={projects?.length ? projects.length + " stycken" : "0 stycken"}
								cardIcon={<SummarizeOutlinedIcon sx={{ fontSize: { sm: '2.5rem', lg: '5rem'}, color: '#68A5EC' }}/>}
								color="#68A5EC"
							/>
						</Grid>


						<Grid xs={6} md={3}>
							<Cards 
								onClick={() => navigate(`/user/${currentUser.uid}/projects`)} 
								title='Nytt Projekt'
								subtitle="Skapa ny beräkning"
								cardIcon={<DataSaverOnOutlinedIcon sx={{ fontSize: { sm: '2.5rem', lg: '5rem'}, color: '#68C37C' }}/>}
								color="#68C37C"
							/>
						</Grid>


						<Grid xs={6} md={3}>
							<Cards 
								onClick={() => navigate(`/user/${currentUser.uid}/material`)}					
								title='Material'
								subtitle="Redigera material"
								cardIcon={<SummarizeOutlinedIcon sx={{ fontSize: { sm: '2.5rem', lg: '5rem'}, color: '#CBC309' }}/>}
								color="#CBC309"
							/>
						</Grid>

						<Grid xs={6} md={3}>
							<Cards 
								onClick={() => navigate(`/user/${currentUser.uid}/material`)}					
								title='Nytt Material'
								subtitle="Lägg till nytt material"
								cardIcon={<DataSaverOnOutlinedIcon sx={{ fontSize: { sm: '2.5rem', lg: '5rem'}, color: '#DC822F' }}/>}
								color="#DC822F"
							/>
						</Grid>

						<Grid xs={12} sx={{ height: "60vh", margin: '20px 8px', backgroundColor: "#fbfbfb", borderRadius: "0 0 10px 10px"}}>
							<Grid xs={12}>
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