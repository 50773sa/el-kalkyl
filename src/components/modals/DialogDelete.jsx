import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../../firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import { toast } from 'react-toastify'
// mui
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import Typography from '@mui/material/Typography'


const DialogDelete = ({ isOpen, setIsOpen, setIsLoading, projectId }) => {
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [error, setError] = useState(false)
	const navigate = useNavigate()
    const { currentUser } = useAuthContext()

	const handleClose = () => {
		setIsOpen(false)
		setIsLoading(false)
	}
  
    const handleDeleteProject = async () => {
        const ref = doc(db, 'projects', projectId)

		setError(null)
		setConfirmDelete(true)

		try {
			await deleteDoc(ref)
			toast.success('Raderat!')
			navigate(`/user/${currentUser.uid}/projects`, { replace: true })
			setIsOpen(false)
			setIsLoading(false)
			
		} catch(err){
			setError(err)
			setIsLoading(false)
		}
	}

    return (
        <Box>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='500px'
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
                                sx={{ color: '#ff5901' }}
                            />

                        </Box>
                    </Box>

                    <IconButton sx={{ display: 'flex', alignItems: 'start', height: '', margin: 1}}>
                        <CloseIcon fontSize='large' onClick={handleClose}/>
                    </IconButton>
                </Box>
               
                <DialogTitle id="alert-dialog-title">
                    <strong>Vill du radera detta projekt?</strong>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Valet går inte att ändra!
                    </DialogContentText>
                </DialogContent>

                {error && <Typography sx={{ color: "#ff0000" }}>{error}</Typography>}

                <DialogActions sx={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                    <Button  
                        fullWidth
                        variant="contained"
                        onClick={handleClose}
                        sx={{ marginBottom: '1rem' }}
                    > 
                        Avbryt
                    </Button>

                    <Button 
                        fullWidth
                        variant="outlined"
                        onClick={handleDeleteProject}
                        style={{ marginLeft: '0'}}
                    >
                        Radera projekt
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default DialogDelete