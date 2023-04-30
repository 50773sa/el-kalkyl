import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

const TableButton = ({ title1, title2, isActive, setIsActive }) => {

    const handleClick = () => {
        setIsActive((prev) => !prev)
    }

    return (
        <Grid2 xs={12} mb={0}>
            <Stack spacing={1} direction="row">

                <Button
                    onClick={handleClick} 
                    variant={isActive ? "contained" : "outlined"} 
                    size="large" 
                    sx={{ 
                        width: '100%', 
                        height: '50px',
                        borderRadius: '10px 10px 0  0'
                    }}
                >
                    {title1}
                </Button>
                <Button 
                    onClick={handleClick} 
                    variant={!isActive ? "contained" : "outlined"} 
                    size="large" 
                    sx={{ 
                        width: '100%', 
                        height: '50px',
                        borderRadius: '10px 10px 0  0'
                    }}
                >
                    {title2}
                </Button>

            </Stack>
        </Grid2>
    )
}

export default TableButton