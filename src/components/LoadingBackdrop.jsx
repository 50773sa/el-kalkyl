import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';

const LoadingBackdrop = ({ loading }) => {
    const [open, setOpen] = useState(true)
    
    return (
        <>
            {loading ? (
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={open}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            ): ''}
        </>

      

  
    )
}

export default LoadingBackdrop