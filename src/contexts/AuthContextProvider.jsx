import { createContext, useContext, useState, useEffect} from 'react'
import { auth, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import LoadingBackdrop from '../components/LoadingBackdrop'
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    updateProfile, 
    signOut,
    updatePassword,
    sendPasswordResetEmail,
} from 'firebase/auth'


const AuthContext = createContext()

const useAuthContext = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = ({ children }) => {
	const [userName, setUserName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    const [currentUser, setCurrentUser] = useState(null) 
    const [loading, setLoading] = useState(true)


    const signUp = async (name, email, password) => {
		await createUserWithEmailAndPassword(auth, email, password)

        await updateProfile(auth.currentUser, {
            displayName: name,
        })
        
		await reloadUser()

		const docRef = doc(db, 'users', auth.currentUser.uid)
        await setDoc(docRef, {
            name,
            email,
            id: auth.currentUser.uid
        })
    }

    const signin = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password)
	}

    const signout = () => {
		return signOut(auth)
	}

    const reloadUser = async () => {
		await auth.currentUser.reload()
		setCurrentUser(auth.currentUser)
        setUserName(auth.currentUser.displayName)
		setUserEmail(auth.currentUser.email)

		return true
	}

    const updateUserPassword = (newPassword) => {
        return updatePassword(auth.currentUser, newPassword)
    }

    const handleUpdateProfile = (displayName) => {
        return updateProfile(auth.currentUser, {
            displayName,
        })
    }

    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setUserEmail(user?.email)
            setUserName(user?.displayName)
            setLoading(false)
        })
        return unsubscribe()

    }, [currentUser])

    const contextValues = {
        signUp,
        signin,
        userEmail,
        currentUser,
        userName,
        setUserName,
        reloadUser,
        signout,
        updateUserPassword,
        handleUpdateProfile,
        resetPassword,
	}

    return (
		<AuthContext.Provider value={contextValues}>
            {loading ? (
               <LoadingBackdrop loading={loading}/>
            ) : (
                children
            )}
		</AuthContext.Provider>
	)
}

export {
    AuthContextProvider as default,
    useAuthContext, 
} 