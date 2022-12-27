import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useAuthContext } from '../contexts/AuthContextProvider';

const settings = ['Profile', 'Logout'];


const Navigation = () => {
    const { currentUser }= useAuthContext

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
  

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
                     
                    
                    {currentUser ? (
                        <>
                            <Tooltip title="Go to my profile">
                                <IconButton sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                                >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    ): ''}

                     
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navigation