import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

const TableButton = ({ title1, title2, isActive, setIsActive }) => {

    const handleClick = () => {
        setIsActive((prev) => !prev)
    }

    return (
        <Stack spacing={1} direction="row">
            <Button
                onClick={handleClick} 
                variant={isActive ? "contained" : "outlined"} 
                size="large" 
                sx={{ 
                    width: '100%', 
                    height: '60px',
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
                    height: '60px',
                    borderRadius: '10px 10px 0  0'
                }}
            >
                {title2}
            </Button>
        </Stack>
    )
}

export default TableButton