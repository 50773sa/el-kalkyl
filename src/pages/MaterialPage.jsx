import { useEffect, useState } from "react"
// components
import AllMaterial from "../components/material/AllMaterial"
import CreateMaterial from "../components/material/CreateMaterial"
import LoadingBackdrop from "../components/LoadingBackdrop"
import ProjectAndMaterialPageWrapper from "../components/reusableComponents/pageWrappers/ProjectAndMaterialPageWrapper"
// hooks
import useViewStore from '../store/useViewStore'
import useGetAuthColl from "../hooks/useGetAuthColl"
import useStreamCollection from '../hooks/useStreamCollection'

const MaterialPage = () => {
    const [loading, setLoading] = useState(true)
    const [materialCategory, setMaterialCategory] = useState(null)
    const { data: material, isLoading: isLoadingMaterial, isError: isErrorMaterial } = useStreamCollection('material')
    const { data: materialCategories, isLoading: isLoadingCategories, isError: isErrorCategories } = useGetAuthColl('categories')
	const isCurrentView = useViewStore((state) => state.isCurrentView)

    const isLoading = isLoadingMaterial || isLoadingCategories
    const isError = isErrorMaterial || isErrorCategories

    useEffect(() => {
        if (isError) return
        if (isLoading) return

        if (materialCategories?.length === 0) {
            return setMaterialCategory([])
        } 

        setMaterialCategory(materialCategories.map(c => ({ value: c.category })))
        setLoading(false)

    }, [isLoading])

    return (
        <ProjectAndMaterialPageWrapper tabsTitleKey1="material" tabsTitleKey2="newMaterial">

            {isLoading && <LoadingBackdrop />}
            {isError && <p>An error occurred...</p>}

            {!isLoading && !loading && (
                isCurrentView.createDoc 
                    ?   <CreateMaterial material={material} materialCategory={materialCategory} setMaterialCategory={setMaterialCategory} />
                    :   <AllMaterial material={material} materialCategory={materialCategory} />     
            )}

        </ProjectAndMaterialPageWrapper>                
    )
}

export default MaterialPage