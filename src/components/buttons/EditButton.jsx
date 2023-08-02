import Button from "@mui/material/Button"

const EditButton = ({ onClick, buttonText }) => {
    return (
        <Button 
            size="small"
            type='button'
            variant="text"
            disableElevation
            onClick={onClick} 
            sx={{ textDecorationLine: 'underline' }} 
        >   
          {buttonText}
        </Button>  
    )
}

export default EditButton