import { db } from '../firebase'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where } from 'firebase/firestore'
import { useAuthContext } from '../contexts/AuthContextProvider'

const useGetDocument = (coll) => {
	const { currentUser } = useAuthContext()

	// ref to collection
	const queryRef = query(collection(db, coll), where('uid', '==', currentUser.uid))

	// get data
	const queryDoc = useFirestoreQueryData([coll],queryRef, {
		idField: 'id',
		subscribe: true,			
	})
	return queryDoc
}

export default useGetDocument