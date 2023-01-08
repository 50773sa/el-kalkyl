import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../firebase'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import Typography from '@mui/material/Typography'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import useStreamCollection from '../../hooks/useStreamCollection'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import CalculationTable from './CalculationTable';
import useStreamDoc from '../../hooks/useStreamDoc'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import { useEffect } from 'react'
import useGetProject from '../../hooks/useGetProject'

const Project = () => {
	const { projectId } = useParams()
	const { currentUser } = useAuthContext()
	const { data: project} = useGetProject(projectId)

	console.log('project', project)
	console.log('project', project[0]?.projectName)


    const deleteProject = async () => {
		const ref = doc(db, 'projects', id)
        console.log('ref', ref)
		await deleteDoc(id)

		toast.success('Raderat!')
        navigate(`/user/${currentUser.uid}/projects`, { replace: true })
	}

    return (
      <div className='wrapper project' id='project'>

			<Grid container spacing={2}>
				<Grid item xs={12} display='flex' alignItems="center" justifyContent="space-between" paddingBottom="2rem" paddingTop='2rem'>

					<Typography
						variant="h6" 
						component="div" 
					>
						<strong>{project[0]?.projectName}</strong> 
					</Typography>

					<ModeEditOutlineOutlinedIcon />


					<Grid xs={2} display="flex" justifyContent="end" alignItems="center" color="red" >
                    	<DeleteForeverIcon onClick={deleteProject} />
                    </Grid>

				</Grid>

				{/**
				 * 	Table
				 */}

				<Grid item xs={12}>
					<CalculationTable />
				</Grid>
			</Grid>
      	</div>
    )
}

export default Project