import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContextProvider'
// mui
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import CloseIcon from '@mui/icons-material/Close';


const DialogDelete = ({ openModal, setOpenModal }) => {
    const navigate = useNavigate()
    const { currentUser } = useAuthContext()

    const handleClose = () => {
      setOpenModal(false)
    }

    return (
        <div>
            <Dialog
                openModal={openModal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='500px'
      
            >
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <div style={{ 
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
                        <div style={{ 
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
                                style={{ color: '#ff5901', }}
                            />

                        </div>
                    </div>

                    <div style={{margin: '1rem'}} >
                        <CloseIcon fontSize='large' onClick={handleClose}/>
                    </div>
                </div>
               
                <DialogTitle id="alert-dialog-title">
                    <strong>Är du säker?</strong>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Valet går inte att ändra!
                    </DialogContentText>
                </DialogContent>

                <DialogActions style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                    <Button  
                        fullWidth
                        variant="contained"
                        onClick={handleClose}
                        style={{ marginBottom: '1rem'}}
                    > 
                        Avbryt
                    </Button>

                    <Button 
                        fullWidth
                        variant="outlined"
                        onClick={() => navigate(`/user/${currentUser.uid}`)}
                        style={{ margin: '0'}}
                    >
                        Lämna sidan
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogDelete