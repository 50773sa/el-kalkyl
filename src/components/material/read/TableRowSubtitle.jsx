// mui
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import EditButton from '../../buttons/EditButton'

const TableRowSubtitle = ({ isEditMode, setIsEditMode }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
            
            <Typography variant="h6" gutterBottom component="div">
                {!isEditMode ? 'Tillhörande produkter' : 'Redigera'}
            </Typography>

            <EditButton
                onClick={() => setIsEditMode((prev) => !prev)} 
                buttonText={isEditMode ? 'Avbryt' : 'Redigera'}
            />
            
        </Box>
    )
}

export default TableRowSubtitle