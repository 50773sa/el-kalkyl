import Button from "@mui/material/Button"

const RemoveButton = ({ size, onClick }) => {
    const deleteRed = '#ff0000'
    return (
        <Button 
            size={size}
            type='button'
            variant="text"
            sx={{ color: deleteRed, borderColor: deleteRed, width: '76px', '&:hover': {color: 'white', backgroundColor: deleteRed } }}
            disableElevation
            onClick={onClick} 
        >   
            <span style={{ whiteSpace: 'nowrap' }}>Radera</span>
        </Button>
    )
}

export default RemoveButton