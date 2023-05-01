import { useParams } from 'react-router-dom'
import EditProject from '../components/project/EditProject'
import LoadingBackdrop from '../components/LoadingBackdrop'
import Container from '@mui/material/Container'
import useStreamCollection from '../hooks/useStreamCollection'


const EditProjectPage = () => {
	const { projectId } = useParams()
	const { data: project, loading } = useStreamCollection('projects')


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