import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import useStreamDoc from '../../hooks/useStreamDoc'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import CalculationTable from './CalculationTable';
import DialogDelete from '../modals/DialogDelete'
import LoadingBackdrop from '../LoadingBackdrop'
// mui
import Typography from '@mui/material/Typography'
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';

const Project = ({ projectId }) => {
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
    const [error, setError] = useState(null)
	const { currentUser } = useAuthContext()
	const { data: project } = useStreamDoc('projects', projectId)
	const navigate = useNavigate()

  
    const deleteProject = async () => {
		setLoading(true)
		setOpen(true)
	}

	const toggleProject = async () => {
		const ref = doc(db, 'projects', projectId)
		setError(null)

		try {
			setLoading(true)
			await updateDoc(ref, {
				completed: !project.completed
			})
			setLoading(false)

		} catch(err) {
			setError(err)
			console.log('error', error)
			setLoading(false)
		}	
	}

    return (
      <div className='wrapper' id='projectWrapper'>

			{loading ? <LoadingBackdrop /> : ''}

			<Grid container spacing={2}>
				<Grid 
					xs={12} 
					display='flex' 
					alignItems="center" 
					justifyContent="space-between" 
					paddingBottom="2rem" 
					paddingTop='2rem'
				>

					<Typography variant="h6" component="div">
						<strong>{project.projectName}</strong> 
					</Typography>

					<span onClick={toggleProject}>
						{project.completed 
							? 	<ToggleOnOutlinedIcon sx={{ color: '#15a715' }}/>  			
							:	<ToggleOffOutlinedIcon  sx={{ color: '#808080' }}/>
						}
					</span>
						
					<ModeEditOutlineOutlinedIcon onClick={() => navigate(`/user/${currentUser.uid}/project/${projectId}/edit`)} />

					<Grid 
						xs={2} 
						display="flex" 
						justifyContent="end" 
						alignItems="center" 
						color="red" 
					>
                    	<DeleteForeverIcon onClick={deleteProject} />
                    </Grid>

				</Grid>

				{/**
				 * 	Table
				 */}

				<Grid item xs={12}>
					<CalculationTable project={project} projectId={projectId}/>
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