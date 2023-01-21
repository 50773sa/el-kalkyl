import { useRef, useState } from 'react'
import { db } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContextProvider'
import useStreamDoc from '../hooks/useStreamDoc'
import Settings from '../components/Settings'
import LoadingBackdrop from './../components/LoadingBackdrop'
import { toast } from 'react-toastify'
// mui
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'


const SettingsPage = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [msg, setMsg] = useState(null)
    const userNameRef = useRef()
    const companyRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()


    const { 
        userEmail, 
        currentUser, 
        userName, 
        updateUserPassword, 
        handleUpdateProfile, 
        reloadUser 
    } = useAuthContext()

    const { data: user } = useStreamDoc('users', currentUser.uid)


    const handleUpdate = async (e) => {
        e.preventDefault()
        const docRef = doc(db, 'users', currentUser.uid)
        const companyData = { company: companyRef.current.value }

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Lösenorden matchar inte!') 
        }

        setError(null)
        setMsg(null)

        try {
            setLoading(true)
            // name
            if (userNameRef.current.value !== currentUser.displayName) {
                await handleUpdateProfile(userNameRef.current.value)
            }
            // company
            if (companyRef.current.value !== user.company) {
                await updateDoc(docRef, companyData)
            }

            // password
            if (passwordRef.current.value) {
                await updateUserPassword(passwordRef.current.value)
            }

            await reloadUser()
            toast.success('Sparat')
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

				<Settings />

				 {/**
				 *  User credentials
				 */}
			

				<div className='mySettings mb-2'>
					<Typography 
						variant="h7" 
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

						<TextField
							inputRef={companyRef}
							id="company"
							label="Företag"
							helperText=" "
							autoComplete="off"
							fullWidth
						/>      
							
						<TextField
							id="email"
							label="E-mail"
							defaultValue={userEmail}
							helperText=" "
							autoComplete="off"
							fullWidth
							disabled
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
								variant="h7" 
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

						{error && <Typography sx={{ color: '#ff0000' }}>{error}</Typography>}

						</Box>

						<Button variant="contained" type='submit' fullWidth >Spara ändringar</Button>
					</Box>

				</div>
			</div>
      	</Container>
    )
}

export default SettingsPage