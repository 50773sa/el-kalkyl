import Container from "@mui/system/Container"
import CreateMaterial from "../components/material/CreateMaterial"
import { useAuthContext } from "../contexts/AuthContextProvider"

const CreateMaterialPage = () => {
    const { currentUser } = useAuthContext()

    return (
        <Container>
            {currentUser && 
                <CreateMaterial/>
            }
        
        </Container>
        
    )
}

export default CreateMaterialPage