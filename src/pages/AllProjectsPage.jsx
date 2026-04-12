import { useEffect, useState } from 'react'
// components
import AllProjects from '../components/project/AllProjects'
import CreateProject from "../components/project/CreateProject"
import LoadingBackdrop from '../components/LoadingBackdrop'
import ProjectAndMaterialPageWrapper from "../components/reusableComponents/pageWrappers/ProjectAndMaterialPageWrapper"
// hooks
import { useAuthContext } from '../contexts/AuthContextProvider'
import useGetAuthColl from '../hooks/useGetAuthColl'
import useViewStore from '../store/useViewStore'

const AllProjectsPage = () => {
	const { currentUser } = useAuthContext()
    const [category, setCategory] = useState(null)
    const { data: projects, isLoading: isLoadingProjects, isError: isErrorProjects } = useGetAuthColl('projects')
    const { data: material, isLoading: isLoadingMaterial, isError: isErrorMaterial } = useGetAuthColl('material')
    const { data: categories, isLoading: isLoadingCategories, isError: isErrorCategories } = useGetAuthColl('categories')
	const isCurrentView = useViewStore((state) => state.isCurrentView)

    const isLoading = isLoadingCategories || isLoadingProjects || isLoadingMaterial
    const isError = isErrorCategories || isErrorProjects || isErrorMaterial

    useEffect(() => {
        if (isError) return
        if (isLoading) return

        setCategory(categories.map(c => ({ value: c.category }) ))
    }, [material, categories])

    return (
        <ProjectAndMaterialPageWrapper tabsTitleKey1="projects" tabsTitleKey2="newProject">

            {isLoading && <LoadingBackdrop /> }
            {isError && <p>An error occurred...</p>}

            {!isLoading && projects && material && categories && (
                isCurrentView.collection 
                    ?   <AllProjects projects={projects} />
                    :   <CreateProject material={material} currentUser={currentUser.uid} category={category}/>                               
            )}

        </ProjectAndMaterialPageWrapper>                
    )
}

export default AllProjectsPage