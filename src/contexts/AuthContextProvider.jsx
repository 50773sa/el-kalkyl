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


    const signUp = async (email, password, name) => {
		await createUserWithEmailAndPassword(auth, email, password)

		await reloadUser()

		const docRef = doc(db, 'users', auth.currentUser.uid)
        await setDoc(docRef, {
            email,
            name,
        })

        console.log('name', name)

    }

    const login = (email, password) => {
        console.log('login', email, password)
		return signInWithEmailAndPassword(auth, email, password)
	}

    const reloadUser = async () => {
		await auth.currentUser.reload()
		setCurrentUser(auth.currentUser)
		setUserName(auth.currentUser.displayName)
		setUserEmail(auth.currentUser.email)

		return true
	}

    useEffect(() => {

        return onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setUserName(user?.displayName)
            setUserEmail(user?.email)
            setLoading(false)
        }), 
        console.log('currentUser', currentUser)


    }, [])

    const contextValues = {
        signUp,
        login,
        setUserEmail,
        currentUser,
		userEmail,
        userName,
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