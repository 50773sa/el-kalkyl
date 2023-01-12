import Container from '@mui/material/Container'
import EditProject from '../components/project/EditProject'

import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContextProvider'
import useGetProject from '../hooks/useGetProject'
import { useEffect, useState } from 'react'


const EditProjectPage = () => {
	const { projectId } = useParams()
	const { currentUser } = useAuthContext()
	const { data: project, loading } = useGetProject(projectId)
	const navigate = useNavigate()



    return (
		<Container>
			<EditProject project={project} projectId={projectId} loading={loading}/>
		</Container>
      
    )
}

export default EditProjectPage