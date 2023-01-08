import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContextProvider'

const useGetProject = (id) => {
    const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)
	const { currentUser } = useAuthContext()

    useEffect(() => {
		const queryRef = query(collection(db, 'projects'),
			where('id', '==', id),
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
			setLoading(false)

		})

		return unsubscribe

	}, [])

    return {
        data, 
        loading
    }
}

export default useGetProject