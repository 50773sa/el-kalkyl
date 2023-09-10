import { useTranslation } from 'react-i18next'
// mui
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import EditButton from '../../buttons/EditButton'

const TableRowSubtitle = ({ isEditMode, setIsEditMode }) => {
    const { t } = useTranslation()
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
            
            <Typography variant="h6" gutterBottom component="div">
                {!isEditMode 
                    ? t(`materials.headings.fittings`, 'Fittings') 
                    : t(`materials.headings.edit`, 'Edit') 
                }
            </Typography>

            <EditButton
                onClick={() => setIsEditMode((prev) => !prev)} 
                buttonText={
                    isEditMode 
                        ?   t(`materials.headings.cancel`, 'Cancel')  
                        :   t(`materials.headings.edit`, 'Edit') 
                }
            />
            
        </Box>
    )
}

export default TableRowSubtitle