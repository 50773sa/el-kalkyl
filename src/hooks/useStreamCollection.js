import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContextProvider'

const useStreamCollection = (coll) => {
    const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [isError, setIsError] = useState(false)	
	const { currentUser } = useAuthContext()

    useEffect(() => {

		// Verify user
		if (!currentUser?.uid) {
			setIsLoading(false)
			return
		}
		setIsLoading(true)
		setIsError(false)

		// reference to collection
		const queryRef = query(collection(db, coll), 
			where('uid', '==', currentUser.uid),
		)

		// get live updates
		const unsubscribe = onSnapshot(queryRef, (snapshot) => {
			const docs = snapshot.docs.map((doc) => {
				return {
					id: doc.id,
					...doc.data(),
				}
			})

			setData(docs)
			setIsLoading(false)

		},	(error) => {
				console.error('Firestore snapshot error:', error)
				setIsError(true)
				setIsLoading(false)
			}
		)

		return unsubscribe

	}, [])

    return {
        data, 
        isLoading,
		isError,
    }
}

export default useStreamCollection