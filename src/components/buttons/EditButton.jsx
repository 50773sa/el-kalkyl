import { useTranslation } from "react-i18next"
import Button from "@mui/material/Button"

const EditButton = ({ onClick, buttonText }) => {
    const { t } = useTranslation()
    return (
        <Button 
            size="small"
            type='button'
            variant="text"
            disableElevation
            onClick={onClick} 
            sx={{ textDecorationLine: 'underline' }} 
        >   
            {!buttonText
                ?   t(`buttons.edit`, 'Edit')
                :   buttonText
            }
        </Button>  
    )
}

export default EditButton