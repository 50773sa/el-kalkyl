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
    const [materialCategory, setMaterialCategory] = useState([])
    const { currentUser } = useAuthContext()
    const { data: material, loading } = useStreamCollection('material')
	const isCurrentView = useViewStore((state) => state.isCurrentView)


    useEffect(() => {
        if(loading) {
            return
        }
        if (material.length === 0) {
            return setMaterialCategory([])
        } 
        // Create a new array with only unique values
        const category = [...new Set(material.map(c => c.category))]
        setMaterialCategory(category.map(c => ({ value: c }) ))

    }, [material])


    return (
        <ProjectAndMaterialPageWrapper tabsTitleKey1="material" tabsTitleKey2="newMaterial">

            {loading && <LoadingBackdrop />}

            {!loading && material && currentUser && materialCategory !== null && (
                isCurrentView.createDoc 
                    ?   <CreateMaterial material={material} materialCategory={materialCategory} setMaterialCategory={setMaterialCategory} />
                    :   <AllMaterial material={material} />     
            )}

        </ProjectAndMaterialPageWrapper>                
    )
}

export default MaterialPage