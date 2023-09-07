import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
// components
import { useAuthContext } from '../../contexts/AuthContextProvider'
import CreateWrapper from '../reusableComponents/pageWrappers/CreateWrapper'
import CalculationTable from'./read/CalculationTable'
import DialogDelete from '../modals/DialogDelete'
import LoadingBackdrop from '../LoadingBackdrop'
// mui
import Button from '@mui/material/Button'
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'

const Project = ({ projectId, project, currentUser }) => {
	const [isLoading, setIsLoading] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState(null)
	const navigate = useNavigate()

	// open delete modal
    const deleteProject = async () => {
		setIsLoading(true)
		setIsOpen(true)
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
			console.log('error', error)
		}	
	}

	const icon = (
		<span style={{ display: 'flex'}} onClick={toggleProject}>
			{project.completed 
				? 	<ToggleOnIcon sx={{ color: '#15a715', fontSize: '2.5rem' }}/>  	
				:	<ToggleOffIcon  sx={{ color: '#808080', fontSize: '2.5rem' }}/>	
			}
		</span>
	)

    return (
        <CreateWrapper 
			h1={project.projectName} 
			icon={icon} 
			isEditBtn={true} 
			onclick={() => navigate(`/user/${currentUser.uid}/project/${projectId}/edit`)} 
			buttonText='edit'
		>

			{isLoading && <LoadingBackdrop /> }

			<Grid container spacing={2}>
				
				{/**
				 * 	Table
				 */}
			

				<Grid xs={12}>
					<CalculationTable project={project} projectId={projectId}/>
				</Grid>

				{/**
				 * 	 Delete button
				 */}

				<Grid xs={12} 
					sx={{ 
						display: 'flex',
						justifyContent: 'start',
						alignItems: 'center'
					}}
				>			
					<Button 
						size="small"
						variant="outlined"
						sx={{ color: '#ff0000', borderColor: '#ff0000', '&:hover': {color: 'white',  borderColor: '#ff0000', backgroundColor: '#ff0000'} }}
						disableElevation
						onClick={deleteProject} 
					>   
						Radera projekt
					</Button>
				</Grid>
			</Grid>

			{isOpen && (
				<DialogDelete 
					isOpen={isOpen} 
					setIsOpen={setIsOpen} 
					setIsLoading={setIsLoading}
					projectId={projectId}
				/> 
			)}
      	</CreateWrapper>
    )
}

export default Project