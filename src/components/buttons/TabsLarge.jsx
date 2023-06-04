import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
//store
import useViewStore from '../../store/useViewStore'

const TabsLarge = ({ title1, title2 }) => {
    const isCurrentView = useViewStore((state) => state.isCurrentView)
    const setIsCurrentView = useViewStore((state) => state.setIsCurrentView)
    
    const handleClick = () => {
        setIsCurrentView({ 
            collection: !isCurrentView.collection, 
            createDoc: !isCurrentView.createDoc,
        })
    }

    return (
        <Grid2 xs={12} md={4} mb={0} pb={0} pl={0}>
            <Stack spacing={1} direction="row">

                <Button
                    onClick={handleClick} 
                    variant={isCurrentView.collection ? "contained" : "outlined"} 
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
                    variant={isCurrentView.createDoc ? "contained" : "outlined"} 
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
        </Grid2>
    )
}

export default TabsLarge