import { useState } from 'react'
import { useAuthContext } from '../contexts/AuthContextProvider'
import { Link, NavLink, useNavigate } from 'react-router-dom';
// mui
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';


const Navigation = () => {
    const [anchorElUser, setAnchorElUser] = useState()
    const { currentUser, signout } = useAuthContext()
    const navigate = useNavigate()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleSignOut = async () => {

        await signout()
        navigate('/', {replace: true})
        handleCloseUserMenu()
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl" >
                <Toolbar 
                    disableGutters
                     sx={{ 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'space-between' 
                    }}
                >

                    {/**
                     *  Logo
                     */}  

                    <Typography
                        variant="h6"
                        noWrap
                        onClick={() => navigate(currentUser ? `/user/${currentUser?.uid}` : '/')} 
                        sx={{
                            mr: 2,
                            display: { xs: 'flex' },
                            fontFamily: 'arial',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            cursor: 'pointer'
                        }}
                    > Kalkyl<KeyboardDoubleArrowUpIcon fontSize='large'/>
                    </Typography> 

                    {/**
                     *  Links and avatar
                     */}    
                     
                    
                    {currentUser ? (
                        <Box sx={{ display: 'flex', alignItems: 'center'}}>

                            <Typography
                                variant="p"
                                noWrap
                                onClick={() => navigate(currentUser ? `/user/${currentUser?.uid}/projects` : '/')} 
                                sx={{
                                    mr: 5,
                                    display: { xs: 'none', sm: 'flex' },
                                    fontFamily: 'arial',
                                    fontWeight: 300,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    cursor: 'pointer'
                                }}
                            > Projekt
                            </Typography>

                            <Typography
                                variant="p"
                                noWrap
                                onClick={() => navigate(currentUser ? `/user/${currentUser?.uid}/material` : '/')} 
                                sx={{
                                    mr: 10,
                                    display: { xs: 'none', sm: 'flex' },
                                    fontFamily: 'arial',
                                    fontWeight: 300,
                                    letterSpacing: '.3rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    cursor: 'pointer'
                                }}
                            > Material
                            </Typography>

                            <Tooltip title="Settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp">
                                        {currentUser.displayName[0]}
                                    </Avatar>
                                </IconButton>
                            </Tooltip>
                            
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                            
                                <MenuItem 
                                    sx={{ color: '#000000', pr: 6 }}  
                                    as={Link} 
                                    to={`/user/${currentUser.uid}/projects`} 
                                    onClick={handleCloseUserMenu}

                                >
                                    <Typography textAlign="center">Projekt</Typography>
                                </MenuItem>

                                <MenuItem 
                                    sx={{ color: '#000000', pr: 6 }}  
                                    as={Link} 
                                    to={`/user/${currentUser.uid}/material`} 
                                    onClick={handleCloseUserMenu}

                                >
                                    <Typography textAlign="center">Material</Typography>
                                </MenuItem>

                                <MenuItem 
                                    sx={{ color: '#000000', pr: 6 }} 
                                    as={Link} 
                                    to={`/user/${currentUser.uid}/settings`} 
                                    onClick={handleCloseUserMenu} 
                                    
                                >
                                    <Typography textAlign="center">Inställningar</Typography>
                                </MenuItem>

                                <MenuItem 
                                    sx={{ color: '#000000', pr: 6 }}
                                    onClick={handleSignOut}
                                >
                                    <Typography textAlign="center">Logga ut</Typography>
                                </MenuItem>

                            </Menu>
                        </Box>                    
                    ): ''}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navigation                
