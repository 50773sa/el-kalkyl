import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react';
import { useAuthContext } from '../contexts/AuthContextProvider'


// mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import { Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import SuccessAlert from './SuccessAlert';
import LoadingBackdrop from './LoadingBackdrop';


const Settings = () => {
    const [alertMsg, setAlertMsg] = useState('')
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null)
    const userNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    const { 
        userEmail, 
        currentUser, 
        userName, 
        updateUserEmail, 
        updateUserPassword, 
        handleUpdateProfile, 
        reloadUser 
    } = useAuthContext()

    const navigate = useNavigate()



    const handleUpdate = async (e) => {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Lösenorden matchar inte!')
        }
        console.log('hallo')
        setError(null)
        setMsg(null)

        try {
            setLoading(true)

            // userName
            if (userNameRef !== currentUser.displayName) {
                await handleUpdateProfile(userNameRef.current.value)
                console.log('username', currentUser.displayName)
            }

            // email
            if (emailRef.current.value !== currentUser.email) {
                await updateUserEmail(emailRef.current.value)
                console.log('email', currentUser.email)

            }

            // password
            if (passwordRef.current.value) {
                await updateUserPassword(passwordRef.current.value)
                console.log('password', currentUser.password)

            }

            await reloadUser()
            setMsg('Profile updated')
            setAlertMsg('Sparat!')
            setOpen(true)
            setLoading(false)

        } catch (e) {
            console.log('error', e)
            setError(e.message)
            setLoading(false)
        }
    }


    return (
        <div className='wrapper settings' id='settings'>

            {loading ? <LoadingBackdrop /> : ''}

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
                    <ListItem disablePadding  onClick={() => navigate(`/user/${currentUser.uid}/settings/add-material`) }>
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
                    onSubmit={handleUpdate}
                >
      
                    <TextField
                        inputRef={userNameRef}
                        id="outlined-helperText"
                        label="Förnamn"
                        defaultValue={userName}
                        helperText=" "
                        fullWidth
                    />        
                        
                    {/* <TextField

                        id="outlined-helperText"
                        label="Efternamn"
                        helperText=" "

                        fullWidth
                    /> */}

                    <TextField
                        inputRef={emailRef}
                        id="outlined-helperText"
                        label="E-mail"
                        defaultValue={userEmail}
                        helperText=" "
                        fullWidth
                    />   
            


                {/**
                 *  Password
                 */}

                <Box
                    className='mb-2'
                    component="div"
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
                        id="currentPassword"
                        helperText=" "   
                    />   

                    <TextField
                        required
                        fullWidth
                        inputRef={passwordRef}
                        name="newPassword"
                        label="Nytt lösenord"
                        type="password"
                        id="newPassword"
                        helperText=" "   
                    /> 

                    <TextField
                        required
                        fullWidth
                        inputRef={passwordConfirmRef}
                        name="passwordConfirm"
                        label="Upprepa nytt lösenord"
                        type="password"
                        id="passwordConfirm"
                        helperText=" "   
                    /> 
                </Box>

                    <Button variant="contained" type='submit' fullWidth >Spara ändringar</Button>
                </Box>
            </div>

            {/**
             *  Alert
             */}

            <SuccessAlert alertMsg={alertMsg} open={open} setOpen={setOpen} />

        </div>
    )
}

export default Settings