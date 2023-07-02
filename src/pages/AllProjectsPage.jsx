// components
import AllProjects from '../components/project/AllProjects'
import CreateProject from "../components/project/CreateProject"
import LoadingBackdrop from '../components/LoadingBackdrop'
import ProjectAndMaterialPageWrapper from "../components/reusableComponents/pageWrappers/ProjectAndMaterialPageWrapper"
import useViewStore from '../store/useViewStore'
// hooks
import useGetAuthColl from '../hooks/useGetAuthColl'
import useStreamCollection from "../hooks/useStreamCollection"
import { useParams } from 'react-router-dom'

const AllProjectsPage = () => {
    const { id } = useParams()
    const { data: projects, isLoading, isError } = useGetAuthColl('projects')
    const { data: material, loading} = useStreamCollection('material')
	const isCurrentView = useViewStore((state) => state.isCurrentView)

    console.log('projects', id)

    return (
        <ProjectAndMaterialPageWrapper tabTitle1="Projekt" tabTitle2="Nytt projekt">

            {isLoading || loading  && <LoadingBackdrop /> }
            {isError && <p>An error occoured...</p>}

            {projects && !loading && material && (
                isCurrentView.collection 
                    ?   <AllProjects projects={projects} />
                    :   <CreateProject material={material} currentUser={id} projects={projects} />                               
            )}

        </ProjectAndMaterialPageWrapper>                
    )
}

export default AllProjectsPage