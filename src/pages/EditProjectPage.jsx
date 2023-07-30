import { useParams } from 'react-router-dom'
// hooks
import useStreamDoc from '../hooks/useStreamDoc'
// components
import EditProject from '../components/project/EditProject'
import LoadingBackdrop from '../components/LoadingBackdrop'
import ProjectAndMaterialPageWrapper from '../components/reusableComponents/pageWrappers/ProjectAndMaterialPageWrapper'

const EditProjectPage = () => {
	const { projectId } = useParams()
	const { data: currentProject, isLoading } = useStreamDoc('projects', projectId)

    return (
        <ProjectAndMaterialPageWrapper isEditPage={true}>

				{isLoading && <LoadingBackdrop /> }

				{!isLoading && currentProject &&
					<EditProject 
						currentProject={currentProject} 
						projectId={projectId}
						
					/>
				}

		</ProjectAndMaterialPageWrapper>
    )
}

export default EditProjectPage