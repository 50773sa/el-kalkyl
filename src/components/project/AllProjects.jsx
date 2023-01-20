import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import getDate from '../helpers/getDate'
// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Typography from '@mui/material/Typography'
import CircleIcon from '@mui/icons-material/Circle';


const AllProjects = ({ projects }) => {
    const { currentUser } = useAuthContext()
    const navigate = useNavigate()

    return (
        <div className='wrapper' id='allProjectsWrapper'>
			<Grid container spacing={2}>

				<Grid xs={12}>
					<Typography variant="h6" component="div">
						<strong>Projekt</strong> 
					</Typography>
				</Grid>

				{/**
				 * 	List
				 */}

                {projects ? projects?.map((list) => (
                    <Grid 
                        container
                        xs={12}
                        key={list.id} 
                        display="flex"
                        alignItems="center"
                        sx={{ borderBottom: '1px solid #d5caca', margin: '0', cursor: 'pointer'}}
                        onClick={() => navigate(`/user/${currentUser.uid}/project/${list.id}`)} 
                    >
                        <Grid xs={7}>{list.projectName}</Grid>
                        <Grid xs={3} sx={{ color: '#5a5454'}}><em>{getDate(list.created)}</em></Grid>

                        <Grid xs={2} display="flex" justifyContent="end" alignItems="center">
                            {list.completed 
                                ? <CircleIcon sx={{ color: '#15a715' }}/>
                                : <CircleIcon sx={{ color: '#ff7000' }}/>
                            }
                        </Grid>
                    </Grid>
                )): ''}
			</Grid>
        </div>
    )
}

export default AllProjects