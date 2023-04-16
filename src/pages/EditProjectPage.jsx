import { useParams } from 'react-router-dom'
import EditProject from '../components/project/EditProject'
import LoadingBackdrop from '../components/LoadingBackdrop'
import Container from '@mui/material/Container'
import useStreamDocument from '../hooks/useStreamDocument'


const EditProjectPage = () => {
	const { projectId } = useParams()
	const { data: project, loading } = useStreamDocument('projects')
	console.log('****', project)
	console.log('project', project)

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