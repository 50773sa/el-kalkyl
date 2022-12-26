import { createContext, useContext, useState, useEffect} from 'react'
import { auth, db } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'
import LoadingBackdrop from '../components/LoadingBackdrop'
import { 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
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


    const signUp = async (email, password) => {
		await createUserWithEmailAndPassword(auth, email, password)

		await reloadUser()

		const docRef = doc(db, 'users', auth.currentUser.uid)
        await setDoc(docRef, {
            email,
        })
    }

    const signIn = (email, password) => {
        console.log('signIn', email, password)
		return signInWithEmailAndPassword(auth, email, password)
	}

    const reloadUser = async () => {
		await auth.currentUser.reload()
		setCurrentUser(auth.currentUser)
		setUserEmail(auth.currentUser.email)

		return true
	}

    useEffect(() => {

        return onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setUserEmail(user?.email.toLowerCase())
            setLoading(false)
            console.log('currentUser', currentUser)

        })

    }, [])

    const contextValues = {
        signUp,
        signIn,
        setUserEmail,
        currentUser,
		userEmail,
        reloadUser,

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