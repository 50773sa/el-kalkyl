import React from 'react'

const SuccessAlert = () => {
    return (
        <Snackbar open={open} autoHideDuration={2000}>
            <Alert severity="success" sx={{ width: '100%' }}>
                Sparat!
            </Alert>
        </Snackbar>
    )
}

export default SuccessAlert