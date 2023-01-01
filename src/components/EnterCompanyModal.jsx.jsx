import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContextProvider'
// mui
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'

import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'


const EnterCompanyModal = ({ open, setOpen, userCompany, setUserCompany }) => {
    const companyRef = useRef()
    const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

    const navigate = useNavigate()
    const { currentUser } = useAuthContext()

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!companyRef) {
            console.log('no comp', companyRef.length)
        }

        try {
            setLoading(true)
            setUserCompany(companyRef.current.value)
            setOpen(false)

        } catch (err) {
            setError(err.message)
        }
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

            <div style={{ margin: '1.5rem'}}>
                <Typography component="p" mb={1}>
                    Vill du lägga till ditt företagsnamn?
                </Typography>
            
                    <TextField
                        inputRef={companyRef}
                        required
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
                    onClick={handleSubmit}
                > 
                    Spara
                </Button>

            </DialogActions>
        </Dialog>
    )
}

export default EnterCompanyModal