import { useParams } from 'react-router-dom'
import LoadingBackdrop from '../components/LoadingBackdrop'
import Project from '../components/project/Project'
import { Container } from '@mui/system'
import useStreamDocument from '../hooks/useStreamDocument'


const ProjectPage = () => {
    const { projectId } = useParams()
	const { data: project, loading } = useStreamDocument('projects', projectId)

    return (
        <Container>
            {loading && <LoadingBackdrop /> }

            {!loading && 
                <Project project={project} projectId={projectId}/>
            }
        </Container>
    )
}

export default ProjectPage