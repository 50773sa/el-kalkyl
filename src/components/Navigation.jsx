import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'


const Navigation = () => {

    return (
        <AppBar position="static">
            <Container maxWidth="xl" >
                <Toolbar disableGutters style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>

                    {/**
                     *  Logo
                     */}  

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex' },
                            fontFamily: 'arial',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        >
                        LOGO
                    </Typography>

                    {/**
                     *  avatar
                     */}    

                    <Tooltip title="Go to my profile">
                        <IconButton sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                    </Tooltip>

                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navigation