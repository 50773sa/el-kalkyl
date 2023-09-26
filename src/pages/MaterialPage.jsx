import { useEffect, useState } from "react"
// components
import AllMaterial from "../components/material/AllMaterial"
import CreateMaterial from "../components/material/CreateMaterial"
import LoadingBackdrop from "../components/LoadingBackdrop"
import ProjectAndMaterialPageWrapper from "../components/reusableComponents/pageWrappers/ProjectAndMaterialPageWrapper"
// hooks
import { useAuthContext } from "../contexts/AuthContextProvider"
import useStreamCollection from "../hooks/useStreamCollection"
import useViewStore from '../store/useViewStore'

const MaterialPage = () => {
    const [materialCategory, setMaterialCategory] = useState(null)
    const { currentUser } = useAuthContext()
    const { data: material, loading } = useStreamCollection('material')
    const { data: materialCategories, loading: isLoadingCategories } = useStreamCollection('categories')
	const isCurrentView = useViewStore((state) => state.isCurrentView)


    useEffect(() => {
        if(isLoadingCategories || loading) {
            return
        }
   
        if (materialCategories.length === 0) {
            return setMaterialCategory([])
        } 
        
        setMaterialCategory(materialCategories.map(c => ({ value: c.category }) ))

    }, [material])

    return (
        <ProjectAndMaterialPageWrapper tabsTitleKey1="material" tabsTitleKey2="newMaterial">

            {loading || isLoadingCategories && <LoadingBackdrop />}

            {!loading && !isLoadingCategories && material && currentUser && materialCategory && (
                isCurrentView.createDoc 
                    ?   <CreateMaterial material={material} materialCategory={materialCategory} setMaterialCategory={setMaterialCategory} />
                    :   <AllMaterial material={material} materialCategory={materialCategory} setMaterialCategory={setMaterialCategory}/>     
            )}

        </ProjectAndMaterialPageWrapper>                
    )
}

export default MaterialPage