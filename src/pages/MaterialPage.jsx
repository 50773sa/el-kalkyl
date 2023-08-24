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
    const { currentUser } = useAuthContext()
    const { data: material, loading } = useStreamCollection('material')
	const isCurrentView = useViewStore((state) => state.isCurrentView)

    return (
        <ProjectAndMaterialPageWrapper tabsTitleKey1="material" tabsTitleKey2="newMaterial">

            {loading && <LoadingBackdrop />}

            {!loading && material && currentUser && (
                isCurrentView.createDoc 
                    ? <CreateMaterial />
                    : <AllMaterial material={material} />     
            )}

        </ProjectAndMaterialPageWrapper>                
    )
}

export default MaterialPage