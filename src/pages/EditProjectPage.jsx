import { useParams } from 'react-router-dom'
import useGetProject from '../hooks/useGetProject'
import EditProject from '../components/project/EditProject'
import LoadingBackdrop from '../components/LoadingBackdrop'
import Container from '@mui/material/Container'


const EditProjectPage = () => {
	const { projectId } = useParams()
	const { data: project, loading } = useGetProject(projectId)


    return (
		<Container>
			{loading && <LoadingBackdrop /> }

			{!loading &&
				<EditProject project={project} projectId={projectId}/>
			}

		</Container>
      
    )
}

export default EditProjectPage