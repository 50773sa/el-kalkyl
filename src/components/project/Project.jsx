import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import Typography from '@mui/material/Typography'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import CalculationTable from './CalculationTable';
import { useAuthContext } from '../../contexts/AuthContextProvider'

import LoadingBackdrop from '../LoadingBackdrop'
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import { useEffect, useState } from 'react'
import useStreamDoc from '../../hooks/useStreamDoc'
import DialogDelete from '../modals/DialogDelete'

const Project = ({ projectId }) => {
	const [confirmDelete, setConfirmDelete] = useState(false)
	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)
    const [error, setError] = useState(null)
	const { currentUser } = useAuthContext()
	const { data: project } = useStreamDoc('projects', projectId)
	const navigate = useNavigate()

	  
    const deleteProject = async () => {
		const ref = doc(db, 'projects', projectId)
		setError(null)
		setLoading(true)

		setOpen(true)

		try {
			if (confirmDelete === false) {
				return	
			}
			await deleteDoc(ref)
			toast.success('Raderat!')
			navigate(`/user/${currentUser.uid}/projects`, { replace: true })
			setLoading(false)

		} catch(err){
			setError(err)
			console.log('error', error)
			setLoading(false)
		}

	}
	console.log('projectId', projectId)

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

	useEffect(() => {

	}, [confirmDelete])


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
					setConfirmDelete={setConfirmDelete} 
				/> 
			)}
      	</div>
    )
}

export default Project