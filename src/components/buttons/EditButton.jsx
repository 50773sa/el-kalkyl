import { useTranslation } from "react-i18next"
import Button from "@mui/material/Button"

const EditButton = ({ onClick }) => {
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
          {t(`buttons.edit`, 'Edit')}
        </Button>  
    )
}

export default EditButton