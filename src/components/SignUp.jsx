import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContextProvider'

import LoadingBackdrop from './LoadingBackdrop'

// mui
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'


const SignUp = () => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const emailRef = useRef()
	const passwordRef = useRef()
	const passwordConfirmRef = useRef()
	const { signUp, reloadUser, currentUser } = useAuthContext()
	const navigate = useNavigate()


	const handleSubmit = async (e) => {
		e.preventDefault()

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Lösenorden matchar inte!')
		}
		setError(null)

		try {
			setLoading(true)
			await signUp(emailRef.current.value, passwordRef.current.value)
			await reloadUser()
			
		} catch (err) {
			setError(err.message)
			setLoading(false)
		}
		setLoading(false)
		navigate(`/user/${currentUser?.uid}`)
	}



  	return (
		<div className='wrapper signUp' id='signUp'>

			{loading && <LoadingBackdrop /> }
			
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
					Registrering
				</Typography>

				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<Grid container spacing={2}>
				
						<Grid item xs={12}>
							<TextField
								inputRef={emailRef}
								required
								fullWidth
								id="email"
								label="Email Adress"
								name="email"
								autoComplete="email"
							/>
						</Grid>

						<Grid item xs={12}>
							<TextField
								inputRef={passwordRef}
								required
								fullWidth
								name="password"
								label="Lösenord"
								type="password"
								id="password"
								autoComplete='password'                

							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								inputRef={passwordConfirmRef}
								required
								fullWidth
								name="passwordConfirm"
								label="Lösenord"
								type="password"
								id="passwordConfirm"
								autoComplete='password'
							/>
						</Grid>

						{error && <p>{error}</p>}
						
						<Grid item xs={12}>
							<FormControlLabel
								control={<Checkbox value="allowExtraEmails" color="primary" />}
								label="Jag vill ha inspiration och erbjudanden via email."
							/>
						</Grid>
					</Grid>

					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					> Registrera
					</Button>

					<Grid container justifyContent="flex-end">
						<Grid item>
							<Link href="/sign-in" variant="body2">
								Har du redan ett konto? Logga in
							</Link>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</div>
	);
}

export default SignUp