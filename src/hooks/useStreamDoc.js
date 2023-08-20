import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'

const useStreamDoc = (coll, id) => {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const ref = doc(db, coll, id)

		// get live updates
		const unsubscribe = onSnapshot(ref, (snapshot) => {
			setData({
				id: snapshot.id,
				...snapshot.data(),
			})
			setIsLoading(false)
		})

		return unsubscribe

	}, [])

	return {
		data,
		isLoading,
	}
}

export default useStreamDoc