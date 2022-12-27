import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from "react-hook-form"
import { useAuthContext } from '../contexts/AuthContextProvider'


// mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import { Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import Button from '@mui/material/Button';


import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'


const Settings = () => {
    const { userEmail } = useAuthContext()


    return (
        <div className='wrapper settings' id='settings'>

            {/** 
             * Profile button and name
             */}

            <Card 
                style={{ 
                    height: '50px', 
                    padding: '24px',
                    paddingBottom: '2rem',
                    marginBottom: '2rem',
                }}
            >
                <CardContent>
                    <Typography variant="h7" component="div" textAlign='center' >
                        Ringsjöbadens Elservice AB <br/>
                        <em>Richie</em> 
                    </Typography>
                </CardContent>
            </Card>

            <div className='section mb-2'>
                <Typography 
                    variant="h6" 
                    component="div" 
                    textAlign='start' 
                    marginBottom='0.5rem'
                >
                    <strong>Inställningar</strong>
                </Typography>

                <List>
                    <ListItem disablePadding>
                        <ListItemButton style={{ paddingLeft: '0'}}>
                            <AddCircleIcon />
                            <ListItemText 
                                style={{ paddingLeft: '1rem'}}
                                primary="Lägg till nytt material" 
                            />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton style={{ paddingLeft: '0'}}>
                            <ModeEditOutlineOutlinedIcon />
                            <ListItemText 
                                style={{ paddingLeft: '1rem'}}
                                primary="Alla projekt" 
                            />
                        </ListItemButton>
                    </ListItem>
                </List>

            </div>


            {/**
             *  User credentials
             */}
        

            <div className='mySettings mb-2'>
                <Typography 
                    variant="h6" 
                    component="div" 
                    textAlign='start' 
                    marginBottom='1rem'
                >
                    <strong>Mina uppgifter</strong>
                </Typography>

                <Box
                    className='mb-2'
                    component="form"
                    noValidate
                    autoComplete="off"
                >
      
                    <TextField
                        id="outlined-helperText"
                        label="Förnamn"
                        helperText=" "
                        fullWidth
                    />        
                        
                        <TextField
                        id="outlined-helperText"
                        label="Efternamn"
                        helperText=" "

                        fullWidth
                    />

                    <TextField
                        id="outlined-helperText"
                        label="E-mail"
                        defaultValue={userEmail}
                        helperText=" "
                        fullWidth
                    />   
                </Box>


                {/**
                 *  Password
                 */}

                <Box
                    className='mb-2'
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <Typography 
                        variant="h6" 
                        component="div" 
                        textAlign='start' 
                        marginBottom='1rem'
                    >
                        Ändra lösenord
                    </Typography>     

                    <TextField
                        required
                        fullWidth
                        name="currentPassword"
                        label="Nuvarande lösenord"
                        type="password"
                        id="CurrentPassword"
                        helperText=" "   
                    />   

                    <TextField
                        required
                        fullWidth
                        name="newPassword"
                        label="Nytt lösenord"
                        type="password"
                        id="newPassword"
                        helperText=" "   
                    /> 

                    <TextField
                        required
                        fullWidth
                        name="passwordConfirm"
                        label="Upprepa nytt lösenord"
                        type="password"
                        id="passwordConfirm"
                        helperText=" "   
                    /> 
                </Box>

                <Button variant="contained" fullWidth>Spara ändringar</Button>

            </div>
        </div>
    )
}

export default Settings