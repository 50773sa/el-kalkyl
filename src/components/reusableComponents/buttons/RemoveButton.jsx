import Button from "@mui/material/Button"

const RemoveButton = ({ size, onClick }) => {
    return (
        <Button 
            size={size}
            type='button'
            variant="outlined"
            sx={{ color: '#ff0000', borderColor: '#ff0000', width: '76px', '&:hover': {color: 'white', backgroundColor: '#ff0000'} }}
            disableElevation
            onClick={onClick} 
        >   
            <span style={{ whiteSpace: 'nowrap' }}>Ta bort</span>
        </Button>
    )
}

export default RemoveButton