import { useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContextProvider'
import LoadingBackdrop from '../components/LoadingBackdrop'
// mui
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

const SignInPage = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const { signin, currentUser, reloadUser } = useAuthContext()

    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        try {
            setLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value)
            await reloadUser()

            navigate(`/user/${currentUser?.uid}`)
            setLoading(false)
           
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }


    return (
        <Container>
            <div className='wrapper'>

                {loading && <LoadingBackdrop />}

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon sx={{ cursor: 'auto' }}  />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Logga in
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, minWidth:' 350px', maxWidth: '500px'}}>
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
                            autoComplete="off"
                        />

                        {error ? 
                            <p style={{ 
                                    color: 'red', 
                                    margin: '0', 
                                    fontFamily: 'roboto'
                                }}
                                > Fel lösenord eller email!
                            </p>
                        : ''}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Logga in
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                <Link href="/reset-password" variant="body2">
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
        </Container>
    )
}

export default SignInPage