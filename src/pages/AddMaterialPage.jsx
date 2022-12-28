import Container from "@mui/system/Container"
import AddMaterial from "../components/AddMaterial"
import { useAuthContext } from "../contexts/AuthContextProvider"

const AddMaterialPage = () => {
    const { currentUser } = useAuthContext()

    return (
        <Container>

            {currentUser && (
                <AddMaterial />
            )}
            
        </Container>
        
    )
}

export default AddMaterialPage