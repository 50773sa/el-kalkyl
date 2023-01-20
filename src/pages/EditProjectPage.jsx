import Container from '@mui/material/Container'
import EditProject from '../components/project/EditProject'

import { useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContextProvider'
import useGetProject from '../hooks/useGetProject'
import { useEffect, useState } from 'react'
import LoadingBackdrop from '../components/LoadingBackdrop'


const EditProjectPage = () => {
	const { projectId } = useParams()
	const { data: project, loading } = useGetProject(projectId)
	console.log('project editpage', project)


    return (
		<Container>
			{loading && <LoadingBackdrop />}

			{!loading &&
				<EditProject project={project} projectId={projectId}/>
			}

		</Container>
      
    )
}

export default EditProjectPage