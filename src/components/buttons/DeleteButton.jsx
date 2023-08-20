// mui
import { useTheme } from "@mui/material"
import Button from "@mui/material/Button"
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import Tooltip from "@mui/material/Tooltip"

const DeleteButton = ({ size, onClick }) => {
    const theme = useTheme()

    return (
        <>
            <Button 
                size={size}
                type='button'
                variant="text"
                sx={{ 
                    display: {xs: 'none', md: 'flex'},
                    color: theme.palette.error.main,
                    borderColor: theme.palette.error.main, 
                    width: '76px', 
                    '&:hover': {
                        color: 'white', 
                        backgroundColor: theme.palette.error.hover, 
                    } 
                }}
                disableElevation
                onClick={onClick} 
            >   
                <span style={{ whiteSpace: 'nowrap' }}>
                    Radera
                </span>
            </Button>

            {/* For small devices */}
            <Tooltip title="Radera tillbehöret från listan">
                <RemoveCircleIcon
                    sx={{ 
                        display: {xs: 'flex', md: 'none'},
                        fontSize: '40px',
                        color: theme.palette.error.main, 
                        '&:hover': {
                            color: theme.palette.error.hover, 
                        } 
                    }}
                    onClick={onClick}
                />
            </Tooltip>
        </>
    )

}

export default DeleteButton