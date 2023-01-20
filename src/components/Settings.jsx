import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContextProvider'
import useStreamDoc from '../hooks/useStreamDoc';
import LoadingBackdrop from './LoadingBackdrop'

// mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import { Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import ModeEditOutlineOutlined from '@mui/icons-material/ModeEditOutlineOutlined'


const Settings = () => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null)
    const userNameRef = useRef()
    const companyRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const navigate = useNavigate()

    const { 
        userEmail, 
        currentUser, 
        userName, 
        updateUserEmail, 
        updateUserPassword, 
        handleUpdateProfile, 
        reloadUser 
    } = useAuthContext()

    const { data } = useStreamDoc('users', currentUser.uid)

    const onSetUserCompany = async () => {
        const docRef = doc(db, 'users', currentUser.uid)
        const companyData = { company: companyRef.current.value }
        
        setError(null)

        try {
            setLoading(true)
            const update = await updateDoc(docRef, companyData)
            await reloadUser()

        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Lösenorden matchar inte!')
        }
        setError(null)
        setMsg(null)

        try {
            setLoading(true)
            onSetUserCompany()

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
            toast.success('Sparat')
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
             * Profile "box" and name
             */}

            <Card 
                style={{ 
                    height: '100px', 
                    padding: '24px',
                    paddingBottom: '2rem',
                    marginBottom: '2rem',
                }}
            >
                <CardContent>
                    <Typography variant="h7" component="div" textAlign='center' >
                        {data?.company ? data?.company : <em>{userName}</em> }<br/> 
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
                    <ListItem disablePadding onClick={() => navigate(`/user/${currentUser.uid}/settings/create-material`) }>
                        <ListItemButton style={{ paddingLeft: '0'}}>
                            <AddCircleIcon />
                            <ListItemText 
                                style={{ paddingLeft: '1rem'}}
                                primary="Lägg till nytt material" 
                            />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => navigate(`/user/${currentUser.uid}/settings/edit-material`) }>
                        <ListItemButton style={{ paddingLeft: '0'}}>
                            <ModeEditOutlineOutlined />
                            <ListItemText 
                                style={{ paddingLeft: '1rem'}}
                                primary="Redigera material" 
                            />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding onClick={() => navigate(`/user/${currentUser.uid}/projects`)} >
                        <ListItemButton style={{ paddingLeft: '0'}}>
                            <FolderOpenOutlinedIcon />
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
                    onSubmit={handleUpdate}
                >
      
                    <TextField
                        inputRef={userNameRef}
                        id="firstName"
                        label="Förnamn"
                        defaultValue={userName}
                        helperText=" "
                        autoComplete="off"
                        fullWidth
                    />   
                    {/*//! not working! */}
                    <TextField
                        inputRef={companyRef}
                        id="company"
                        label="Företag"
                        defaultValue={data?.company}
                        helperText=" "
                        // autoComplete="off"
                        fullWidth
                    />      
                        
                    <TextField
                        inputRef={emailRef}
                        id="email"
                        label="E-mail"
                        defaultValue={userEmail}
                        helperText=" "
                        autoComplete="off"
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
                        autoComplete="off"
                    >
                        Ändra lösenord
                    </Typography>     

                    <TextField
                        required
                        fullWidth
                        inputRef={passwordRef}
                        name="newPassword"
                        label="Nytt lösenord"
                        type="password"
                        id="newPassword"
                        helperText=" "   
                        autoComplete="off"
                    /> 

                    <TextField
                        required
                        fullWidth
                        inputRef={passwordConfirmRef}
                        name="passwordConfirm"
                        label="Upprepa nytt lösenord"
                        type="password"
                        id="passwordConfirm"
                        autoComplete="off"
                        helperText=" "   
                    /> 
                </Box>

                    <Button variant="contained" type='submit' fullWidth >Spara ändringar</Button>
                </Box>
            </div>
        </div>
    )
}

export default Settings