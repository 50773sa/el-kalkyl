import React, { useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'


const SuccessAlert = ({ alertMsg, open, setOpen }) => {

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    })

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert severity="success" sx={{ width: '100%' }}>
                {alertMsg}
            </Alert>
        </Snackbar>
    )
}

export default SuccessAlert