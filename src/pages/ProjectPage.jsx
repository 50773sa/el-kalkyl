import { useParams } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContextProvider'
// hooks
import useStreamDoc from '../hooks/useStreamDoc'
// components
import LoadingBackdrop from '../components/LoadingBackdrop'
import Project from '../components/project/Project'
import ProjectAndMaterialPageWrapper from '../components/reusableComponents/pageWrappers/ProjectAndMaterialPageWrapper'

const ProjectPage = () => {
    const { currentUser } = useAuthContext()
    const { projectId } = useParams()
	const { data: project, loading } = useStreamDoc('projects', projectId)

    return (
        <ProjectAndMaterialPageWrapper isProjectPage={true}>
            {loading && <LoadingBackdrop /> }

            {!loading && project && (
                <Project project={project} projectId={projectId} currentUser={currentUser} />
            )}
        </ProjectAndMaterialPageWrapper>
    )
}

export default ProjectPage