import { useParams } from 'react-router-dom'
import LoadingBackdrop from '../components/LoadingBackdrop'
import Project from '../components/project/Project'
import { Container } from '@mui/system'
import useStreamDoc from '../hooks/useStreamDoc'


const ProjectPage = () => {
    const { projectId } = useParams()
	const { data: project, loading } = useStreamDoc('projects', projectId)

    return (
        <Container>
            {loading && <LoadingBackdrop /> }

            {!loading && project &&
                <Project project={project} projectId={projectId}/>
            }
        </Container>
    )
}

export default ProjectPage