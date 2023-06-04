import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import CalculationTable from './CalculationTable';
import DialogDelete from '../modals/DialogDelete'
import LoadingBackdrop from '../LoadingBackdrop'
// mui
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'

const Project = ({ projectId, project }) => {
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
    const [error, setError] = useState(null)
	const { currentUser } = useAuthContext()
	const navigate = useNavigate()

	// open delete modal
    const deleteProject = async () => {
		setLoading(true)
		setOpen(true)
	}

	const toggleProject = async () => {
		const ref = doc(db, 'projects', projectId)
		setError(null)

		try {
			await updateDoc(ref, {
				completed: !project.completed
			})
		} catch(err) {
			setError(err)
		}	
	}

    return (
      <div className='wrapper' id='projectWrapper'>

			{loading && <LoadingBackdrop /> }

			<Grid container spacing={2}>
				<Grid
					xs={11} 
					md={3}
					display='flex' 
					alignItems="center" 
					justifyContent="space-between" 
					paddingBottom="2rem" 
					paddingTop='2rem'
				>

					<Typography variant="h6" component="div">
						<strong>{project.projectName}</strong> 
					</Typography>
				</Grid>

				<Grid 
					xs={1}
					md={3}
					display= 'flex'
					justifyContent={{ xs: 'end', md: 'start'}}
					alignItems='center'
				>
					<span onClick={toggleProject}>
						{project.completed 
							? 	<ToggleOnIcon sx={{ color: '#15a715', fontSize: '2.5rem' }}/>  	
							:	<ToggleOffIcon  sx={{ color: '#808080', fontSize: '2.5rem' }}/>	
						}
					</span>
				</Grid>
				
				<Grid
					xs={12}
					md={6}
					sx={{ display: { xs: 'none ', md: 'flex'} }}
					alignItems="center"
					justifyContent="end"
				>			
					<Button 
						sx={{ px: 1, mr: 2, width: '130px' }}
						variant="outlined" 
						onClick={() => navigate(`/user/${currentUser.uid}/project/${projectId}/edit`)} 				
					>
						<ModeEditIcon />
						Redigera 
					</Button>

					<Button 
						sx={{ px: 1, width: '130px' }}
						variant="outlined" 					 
						onClick={deleteProject} 				
					>
						<DeleteForeverIcon  />
						Radera 
					</Button>
			

				</Grid>
				
				{/**
				 * 	Table
				 */}

				<Grid item xs={12}>
					<CalculationTable project={project} projectId={projectId}/>
				</Grid>

				{/**
				 * 	 Edit and delete buttons only visible on small devices
				 */}

				<Grid
					xs={12}
					md={6}
					sx={{ display: { md: 'none '} }}
					alignItems="center"
					justifyContent="end"
				>			
					<Button 
						sx={{ px: 1, mr: 2, width: '130px' }}
						size='large'
						variant="outlined" 
						onClick={() => navigate(`/user/${currentUser.uid}/project/${projectId}/edit`)} 				
					>
						<ModeEditIcon />
						Redigera 
					</Button>

					<Button 
						sx={{ px: 1, width: '130px' }}
						size='large'
						variant="outlined" 					 
						onClick={deleteProject} 				
					>
						<DeleteForeverIcon  />
						Radera 
					</Button>
				</Grid>
			</Grid>

			{open && (
				<DialogDelete 
					open={open} 
					setOpen={setOpen} 
					setLoading={setLoading}
					projectId={projectId}
				/> 
			)}
      	</div>
    )
}

export default Project