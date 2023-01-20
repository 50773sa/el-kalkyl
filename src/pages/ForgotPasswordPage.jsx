import { useRef, useState} from 'react'
import { useAuthContext } from '../contexts/AuthContextProvider'
import LoadingBackdrop from '../components/LoadingBackdrop'
// mui
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'

const ForgotPasswordPage = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(false)
    const emailRef = useRef()
    const { resetPassword } = useAuthContext()


    const handleReset = async (e) => {
        e.preventDefault()
        setError(null)
        setMessage(null)

        try {
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage("Vi har skickat din länk!")

            setLoading(false)
        } catch (err) {
            setError(err.message)
            setMessage("Fel uppstod, har du skrivit in rätt e-mail?")
            setLoading(false)
        }
        setLoading(false)
    }



    return (
        <Container>
            <div className='wrapper' id='forgotPassword'>

                {loading && <LoadingBackdrop /> }

                <Grid container spacing={2}> 
                    <Grid
                        xs={12}
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

                        <Typography component="h1" variant="h5" marginBottom='1rem'>
                            Återställ lösenord
                        </Typography>     
                        
                        <Typography component="p" >
                            Skriv i din e-mail så skickar vi din verifieringslänk
                        </Typography>

                        <Box component="form" onSubmit={handleReset} noValidate sx={{ mt: 3, minWidth: '350px', maxWidth: '500px'}}>
                            <TextField
                                inputRef={emailRef}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <Typography className='error'>
                                {message}
                            </Typography>
                        
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                            >
                                Skicka
                            </Button>

                            
                            {/* <Grid  xs={12}> */}
                                <Link href="/" variant="body2">
                                    Logga in
                                </Link>
                            {/* </Grid> */}
                            
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}

export default ForgotPasswordPage