import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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


const SignUpPage = () => {
    const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const usernameRef = useRef()
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const { signUp, reloadUser, currentUser } = useAuthContext()
	const navigate = useNavigate()


    const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null)

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Lösenorden matchar inte!')
		}
		setError(null)

		try {
			setLoading(true)
			await signUp(usernameRef.current.value, emailRef.current.value, passwordRef.current.value)
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
                        <LockOutlinedIcon sx={{ cursor: 'auto' }} />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Registrering
                    </Typography>

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, minWidth: '350px', maxWidth: '500px' }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    inputRef={usernameRef}
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Förnamn"
                                    name="firstName"
                                    autoComplete="firstName"
                                    helperText=" "
                                />
                    
                                <TextField
                                    inputRef={emailRef}
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    helperText=" "
                                />

                                <TextField
                                    inputRef={passwordRef}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Lösenord"
                                    type="password"
                                    id="password"
                                    autoComplete='password'      
                                    helperText=" "
                                />
                                <TextField
                                    inputRef={passwordConfirmRef}
                                    required
                                    fullWidth
                                    name="passwordConfirm"
                                    label="Upprepa lösenord"
                                    type="password"
                                    id="passwordConfirm"
                                    autoComplete='password'
                                    helperText=" "
                                />
                                {error && <Typography sx={{ color: '#ff0000' }}>{error}</Typography>}

                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mb: 2 }}
                        > Registrera
                        </Button>

                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Har du redan ett konto? Logga in
                                </Link>
                            </Grid>
                        </Grid>
                        
                    </Box>
                </Box>
            </div>
        </Container>
	)
}


export default SignUpPage