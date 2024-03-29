import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContextProvider'
import useLanguageStore from '../store/useLanguageStore'
import useStreamCollection from '../hooks/useStreamCollection'
import LoadingBackdrop from './../components/LoadingBackdrop'
// mui
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
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
	const { data: user } = useStreamCollection('users', currentUser.uid)
	const { t, i18n } = useTranslation()
	const setLanguage = useLanguageStore((state) => state.setLanguage)

	const language = useLanguageStore((state) => state.currLanguage)
	// console.log('language', language)

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

	const handleChangeLanguage = (lng) => {
		// localStorage.setItem("lang", lng)
		setLanguage({ currLanguage: lng })
		i18n.changeLanguage(language.currLanguage)
	}

 	return (
    	<Container>
			<div className='wrapper'>

            	{loading && <LoadingBackdrop />}

				<Typography 
					variant="h6" 
					component="div" 
					textAlign='start' 
					marginBottom='2rem'
				>
					<strong>{t(`settingsPage.headings.settings`)}</strong>
				</Typography>


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
						<strong>{t(`settingsPage.headings.account`, 'My account')}</strong>
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
							label={t(`settingsPage.labels.name`, 'Name')}
							defaultValue={userName}
							helperText=" "
							autoComplete="off"
							fullWidth
						/>   

						<TextField
							inputRef={companyRef}
							id="company"
							label={t(`settingsPage.labels.company`, 'Company')}
							helperText=" "
							autoComplete="off"
							fullWidth
						/>      
							
						<TextField
							id="email"
							label={t(`settingsPage.labels.email`, 'E-mail')}
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
								{t(`settingsPage.headings.password`, 'Change password')}
							</Typography>     

							<TextField
								required
								fullWidth
								inputRef={passwordRef}
								name="newPassword"
								label={t(`settingsPage.labels.newPassword`, 'New password')}
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
								label={t(`settingsPage.labels.repeatNewPassword`, 'Repeat new password')}
								type="password"
								id="passwordConfirm"
								autoComplete="off"
								helperText=" "   
							/> 

							{error && <Typography sx={{ color: '#ff0000' }}>{error}</Typography>}

						</Box>

						{/**
						 *  Language
						 */}

						<Box
							className='mb-2'
							component="div"
							// sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
						>
							<Typography 
								variant="h7" 
								component="div" 
								textAlign='start' 
								marginBottom='1rem'
							>
								{t(`settingsPage.headings.language`, 'Language')} {/* second param is backup if something's not working */}
							</Typography>   

							
							<Typography component="p" sx={{ display: 'flex', pb: 1}} onClick={() => handleChangeLanguage('en')}> 
								{i18n.language === 'en'
									?	<RadioButtonCheckedIcon  sx={{ pr: 1}} />
									:	<RadioButtonUncheckedIcon sx={{ pr: 1}} /> 
								}
								<span style={{ cursor: 'default' }}>{t(`settingsPage.language.en`, 'English')}</span>
							</Typography>

							<Typography component="p" sx={{ display: 'flex'}} onClick={() => handleChangeLanguage('sv')}> 
								{i18n.language === 'sv'
									?	<RadioButtonCheckedIcon  sx={{ pr: 1}} />
									:	<RadioButtonUncheckedIcon sx={{ pr: 1}} /> 
								}
								<span style={{ cursor: 'default' }}>{t(`settingsPage.language.sv`, 'Swedish')}</span>
							</Typography>
						</Box>

						<Button variant="contained" type='submit' fullWidth>
							{t(`settingsPage.button.save`, 'Save')}
						</Button>
					</Box>

				</div>
			</div>
      	</Container>
    )
}

export default SettingsPage