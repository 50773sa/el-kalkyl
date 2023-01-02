import { db } from '../firebase'
import { collection, query, orderBy } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { useAuthContext } from '../contexts/AuthContextProvider'

const useGetUsers = (options = {}) => {
	const { currentUser } = useAuthContext()

	// ref to collection
	const collRef = collection(db, 'users')

	// show only currentUser or all users
	const queryKey = options.fetchOnlyCurrentUser
	? ['users', { id: currentUser.uid }]
	: ['users']

	const queryRef = options.fetchOnlyCurrentUser
	? query(collRef, where('id', '==', currentUser.uid))
	: query(collRef, orderBy('name', 'desc'))

	// get data
	const userQuery = useFirestoreQueryData(queryKey, queryRef,  {
		idField: 'id',
		subscribe: true,
	})

	console.log('queryKey', queryKey)
    console.log('queryRef', queryRef)
	console.log('userQuery', userQuery)

	return userQuery
}

export default useGetUsers