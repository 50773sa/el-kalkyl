import { db } from '../firebase'
import { collection, query, where } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { useAuthContext } from '../contexts/AuthContextProvider'

const useGetAuthColl = (coll) => {
	const { currentUser } = useAuthContext()
	
	// ref to collection
	const queryRef = query(collection(db, coll), 
		where('uid', '==', currentUser.uid)
	)

	// get data
	const userQuery = useFirestoreQueryData([coll], queryRef,  {
		idField: 'id',
		subscribe: true,
	}, {
		refetchOnMount: 'always'
	})

	return userQuery
}

export default useGetAuthColl