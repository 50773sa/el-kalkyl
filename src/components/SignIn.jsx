import React from 'react';
import { useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContextProvider';
// mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LoadingBackdrop from './LoadingBackdrop';


const SignIn = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [_error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { signIn, currentUser } = useAuthContext()

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            setLoading(true)
            await signIn(emailRef.current.value, passwordRef.current.value)
            console.log('emailref', emailRef)
            navigate(`/user/${currentUser?.uid}`)
            console.log('hallå')

        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
        console.log('curr', currentUser)

    }

    return (
        <div>

            {loading ? <LoadingBackdrop /> : ''}

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Logga in
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        inputRef={emailRef}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Adress"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        inputRef={passwordRef}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Lösenord"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
          

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        Logga in
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Glömt lösenord?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/sign-up" variant="body2">
                                {"Inget konto ännu? Registrera dig"}
                            </Link>
                        </Grid>
                    </Grid>

                </Box>
            </Box>
        </div>
    )
}

export default SignIn