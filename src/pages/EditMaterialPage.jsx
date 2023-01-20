import { Container } from '@mui/system'
import LoadingBackdrop from '../components/LoadingBackdrop'
import EditMaterial from '../components/project/material/EditMaterial'
import useGetMaterial from '../hooks/useGetMaterial'


const EditMaterialPage = () => {
	const { data: material, isLoading } = useGetMaterial()
    console.log('material', material)

    return (
        <Container>
            {isLoading && <LoadingBackdrop />}

            {!isLoading &&
                <EditMaterial material={material} />
            }

        </Container>
    )
}

export default EditMaterialPage