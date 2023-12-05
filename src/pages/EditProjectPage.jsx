import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
// hooks
import { useAuthContext } from '../contexts/AuthContextProvider'
import useStreamCollection from '../hooks/useStreamCollection'
import useStreamDoc from '../hooks/useStreamDoc'
// components
import EditProject from '../components/project/EditProject'
import LoadingBackdrop from '../components/LoadingBackdrop'
import ProjectAndMaterialPageWrapper from '../components/reusableComponents/pageWrappers/ProjectAndMaterialPageWrapper'

const EditProjectPage = () => {
	const { projectId } = useParams()
	const [category, setCategory] = useState(null)
	const { currentUser } = useAuthContext()
	const { data: currentProject, isLoading } = useStreamDoc('projects', projectId)
	const { data: material, loading} = useStreamCollection('material')
	const { data: categories, loading: isLoadingCategories} = useStreamCollection('categories')

	useEffect(() => {
        if(isLoadingCategories || isLoading || loading) {
            return
        }

        setCategory(categories.map(c => ({ value: c.category }) ))

    }, [material, categories])

    return (
        <ProjectAndMaterialPageWrapper isEditPage={true}>

				{loading || isLoading || isLoadingCategories && <LoadingBackdrop /> }

				{ !loading && !isLoading && !isLoadingCategories && currentProject && currentUser && category && categories &&
					<EditProject 
						currentProject={currentProject} 
						projectId={projectId}
						currentUser={currentUser}
						material={material}
						category={category}
					/>
				}

		</ProjectAndMaterialPageWrapper>
    )
}

export default EditProjectPage