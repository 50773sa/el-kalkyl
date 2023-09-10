import { useTranslation } from 'react-i18next'
// mui
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'


const DialogDeleteMaterial = ({ isOpen, setIsOpen, setIsLoading, handleDeleteFromFb, isError }) => {
    const { t } = useTranslation()
	const handleClose = () => {
		setIsOpen(false)
		setIsLoading(false)
	}

    return (
        <Box>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            flexDirection: 'row',
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            margin: '1rem', 
                            backgroundColor: '#ffae0147', 
                            width: '6rem', 
                            height: '6rem', 
                            borderRadius: '50%' 
                        }}
                    >
                        <Box
                            sx={{ 
                                display: 'flex', 
                                justifyContent: 'center', 
                                alignItems: 'center', 
                                backgroundColor: '#ff590147', 
                                width: '4rem', 
                                height: '4rem', 
                                borderRadius: '50%' 
                            }}
                        >
                            <SaveOutlinedIcon 
                                fontSize='large' 
                                sx={{ color: '#ff5901', }}
                            />

                        </Box>
                    </Box>

                    <Box sx={{ margin: '1rem' }}>
                        <CloseIcon fontSize='large' onClick={handleClose}/>
                    </Box>
                </Box>
               
                <DialogTitle id="alert-dialog-title">
                    <strong>{t(`modals.title`)}</strong>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    {t(`modals.subtitle`)}
                    </DialogContentText>
                </DialogContent>

                {isError && <Typography sx={{ color: "#ff0000" }}>{isError}</Typography>}

                <DialogActions sx={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                    <Button  
                        fullWidth
                        variant="contained"
                        onClick={handleClose}
                        sx={{ marginBottom: '1rem' }}
                    > 
                        {t(`modals.cancel`, 'Cancel')}
                    </Button>

                    <Button 
                        fullWidth
                        variant="outlined"
                        onClick={handleDeleteFromFb}
                        style={{ marginLeft: '0'}}
                    >
                        {t(`modals.deleteMaterial`, 'Delete material')}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default DialogDeleteMaterial