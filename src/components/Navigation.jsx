import { useState } from 'react'
import { useAuthContext } from '../contexts/AuthContextProvider'
import { useNavigate } from 'react-router-dom';
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


const Navigation = () => {
    const [anchorElUser, setAnchorElUser] = useState()
    const { currentUser, signout }= useAuthContext()
    const navigate = useNavigate()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    const handleSignOut = async () => {

        await signout()
        navigate('/')
        handleCloseUserMenu()
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl" >
                <Toolbar 
                    disableGutters
                     style={{ 
                        width: '100%', 
                        display: 'flex', 
                        justifyContent: 'space-between' 
                    }}
                >

                    {/**
                     *  Logo
                     */}  

                    <Tooltip>
                        <Typography
                            variant="h6"
                            noWrap
                            onClick={() => navigate(`/user/${currentUser?.uid}`)} 
                            sx={{
                                mr: 2,
                                display: { xs: 'flex' },
                                fontFamily: 'arial',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        > Kalkyl<KeyboardDoubleArrowUpIcon fontSize='large'/>
                        </Typography>
                    </Tooltip>
                        

                    {/**
                     *  Avatar
                     */}    
                     
                    
                    {currentUser ? (
                        <>
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
                                    <MenuItem onClick={() => navigate(`/user/${currentUser.uid}/settings`) && handleCloseUserMenu} >
                                        <Typography textAlign="center">Profil</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleSignOut}>
                                        <Typography textAlign="center">Logga ut</Typography>
                                    </MenuItem>
                            </Menu>
                        </>
                    ): ''}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navigation                
