import { useParams } from 'react-router-dom'
import LoadingBackdrop from '../components/LoadingBackdrop'
import Project from '../components/project/Project'
import ProjectAndMaterialPageWrapper from '../components/reusableComponents/pageWrappers/ProjectAndMaterialPageWrapper'
import useStreamDoc from '../hooks/useStreamDoc'

const ProjectPage = () => {
    const { projectId } = useParams()
	const { data: project, loading } = useStreamDoc('projects', projectId)

    return (
        <ProjectAndMaterialPageWrapper isProjectPage={true}>
            {loading && <LoadingBackdrop /> }

            {!loading && project &&
                <Project project={project} projectId={projectId}/>
            }
        </ProjectAndMaterialPageWrapper>
    )
}

export default ProjectPage