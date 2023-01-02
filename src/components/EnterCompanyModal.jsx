import { useRef, useState } from 'react'
import { useAuthContext } from '../contexts/AuthContextProvider'
import { db } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'


// mui
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'

import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'


const EnterCompanyModal = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
    const companyRef = useRef()
    const { currentUser, reloadUser } = useAuthContext()

    const onSetUserCompany = async () => {
        const docRef = doc(db, 'users', currentUser.uid)
        const data = { company: companyRef.current.value }
        
        setError(null)

        try {
            setLoading(true)
            const update = await updateDoc(docRef, data)
            setOpen(false)
            await reloadUser()
            console.log('update', update)

        } catch (err) {
            setError(err.message)
            console.log('error', error)
            setLoading(false)
        }
        console.log('doc', docRef)
    }



    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"    
        >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end'}}>
                <div style={{margin: '1rem'}} >
                    <CloseIcon fontSize='large' onClick={handleClose}/>
                </div>
            </div>

            <div style={{ margin: '1.5rem'}} >
                <Typography component="p" mb={1}>
                    Vill du lägga till ditt företagsnamn?
                </Typography>
            
                    <TextField
                        inputRef={companyRef}
                        fullWidth
                        id="company"
                        label="Företag"
                        name="company"
                        autoComplete="off"
                        helperText=" "
                    />
            </div>
                
            <DialogActions style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                <Button  
                    fullWidth
                    variant="contained"
                    onClick={onSetUserCompany}
                > 
                    Spara
                </Button>

            </DialogActions>
        </Dialog>
    )
}

export default EnterCompanyModal