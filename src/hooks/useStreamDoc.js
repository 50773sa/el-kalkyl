import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'

const useStreamDoc = (coll, id) => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const ref = doc(db, coll, id)

		// ge live updates
		const unsubscribe = onSnapshot(ref, (snapshot) => {
			setData({
				id: snapshot.id,
				...snapshot.data(),
			})
			setLoading(false)
		})

		return unsubscribe

	}, [])

	return {
		data,
		loading,
	}
}

export default useStreamDoc