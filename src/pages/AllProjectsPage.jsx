import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// components
import AllProjects from '../components/project/AllProjects'
import CreateProject from "../components/project/CreateProject"
import LoadingBackdrop from '../components/LoadingBackdrop'
import ProjectAndMaterialPageWrapper from "../components/reusableComponents/pageWrappers/ProjectAndMaterialPageWrapper"
import useViewStore from '../store/useViewStore'
// hooks
import useGetAuthColl from '../hooks/useGetAuthColl'
import useStreamCollection from "../hooks/useStreamCollection"

const AllProjectsPage = () => {
    const { id } = useParams()
    const [category, setCategory] = useState(null)
    const { data: projects, isLoading, isError } = useGetAuthColl('projects')
    const { data: material, loading} = useStreamCollection('material')
    const { data: categories, loading: isLoadingCategories} = useStreamCollection('categories')
	const isCurrentView = useViewStore((state) => state.isCurrentView)

    useEffect(() => {
        if(isLoadingCategories ||  isLoading || loading) {
            return
        }

        setCategory(categories.map(c => ({ value: c.category }) ))

    }, [projects, material,categories])

    return (
        <ProjectAndMaterialPageWrapper tabsTitleKey1="projects" tabsTitleKey2="newProject">

            {isLoading || loading  && <LoadingBackdrop /> }
            {isError && <p>An error occoured...</p>}

            {projects && !loading && !isLoading && material && categories !== null && (
                isCurrentView.collection 
                    ?   <AllProjects projects={projects} />
                    :   <CreateProject material={material} currentUser={id} category={category}/>                               
            )}

        </ProjectAndMaterialPageWrapper>                
    )
}

export default AllProjectsPage