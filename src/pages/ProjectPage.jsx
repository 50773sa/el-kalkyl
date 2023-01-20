import { Container } from '@mui/system'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import LoadingBackdrop from '../components/LoadingBackdrop'
import Project from '../components/project/Project'
import useGetProject from '../hooks/useGetProject'


const ProjectPage = () => {
    const { projectId } = useParams()
	const { data: project, loading } = useGetProject(projectId)
    console.log('project projectpage', project)

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