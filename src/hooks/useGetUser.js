import { db } from '../firebase'
import { collection, query, where } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { useAuthContext } from '../contexts/AuthContextProvider'

const useGetUser = () => {
	const { currentUser } = useAuthContext()
	
	// ref to collection
	const queryRef = query(collection(db, 'users'), where('id', '==', currentUser.uid))

	// get data
	const userQuery = useFirestoreQueryData(['users'], queryRef,  {
		idField: 'id',
		subscribe: true,
	})

	return userQuery
}

export default useGetUser