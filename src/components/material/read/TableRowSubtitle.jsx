// mui
import Box from '@mui/material/Box'
import Button from "@mui/material/Button"
import Typography from '@mui/material/Typography'

const TableRowSubtitle = ({ isEditMode, setIsEditMode }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
            
            <Typography variant="h6" gutterBottom component="div">
                {!isEditMode ? 'Tillhörande produkter' : 'Redigera'}
            </Typography>

            <Button 
                size="small"
                type='button'
                variant="text"
                disableElevation
                onClick={() => setIsEditMode((prev) => !prev)} 
                sx={{ textDecorationLine: 'underline' }} 
            >   
                {isEditMode 
                    ? 'Avbryt' 
                    : 'Redigera'
                }
            </Button>
        </Box>
    )
}

export default TableRowSubtitle