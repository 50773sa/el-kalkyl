import React from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'





const TabsLarge = ({ title1, title2, isActive, setIsActive, icon1, icon2, color1, color2 }) => {

    const handleClick = () => {
        setIsActive((prev) => !prev)
    }

    return (
        <Grid2 xs={12} md={4} mb={0} pb={0} pl={0}>
            <Stack spacing={1} direction="row">

                {/* <Card 
                    onClick={handleClick}
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'center',
                        width: '20%', 
                        height: '60px',
                        border: isActive ? `2px solid ${color1}` : '',
                        borderBottom: `5px solid ${color1}`,
                        cursor: 'pointer',
                        borderRadius: '10px 10px 0 0',
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h6">
                                {title1}
                            </Typography>
                        </CardContent>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center'}}>
                        {icon1}
                    </Box>
                </Card>
  	
           
                <Card 
                        onClick={handleClick}
                        sx={{ 
                            display: 'flex', 
                            justifyContent: 'center',
                            width: '20%', 
                            height: '60px',
                            border: isActive ?  '': `2px solid ${color2}` ,
                            borderBottom: `5px solid ${color2}`,
                            cursor: 'pointer',
                            borderRadius: '10px 10px 0 0'
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h6">
                                    {title2}
                                </Typography>
                            </CardContent>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center'}}>
                            {icon2}
                        </Box>
                </Card> */}

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
        </Grid2>
    )
}

export default TabsLarge