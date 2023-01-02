import { db } from '../firebase'
import { collection } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { useAuthContext } from '../contexts/AuthContextProvider'

const useGetMaterial = (options = {}) => {
	const { currentUser } = useAuthContext()

	// ref to collection
	const collRef = collection(db, 'material')

	const queryKey = options.fetchOnlyCurrentUser ? ['material', { user: currentUser.uid}] : ''

	// get data
	const projectQuery = useFirestoreQueryData(collRef, queryKey, {
		idField: 'id',
		subscribe: true,			
	})

	console.log('projectQuery', projectQuery)

	return projectQuery
}

export default useGetMaterial