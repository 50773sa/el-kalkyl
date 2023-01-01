import { db } from '../firebase'
import { collection, query, orderBy } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'

const useGetUsers = () => {
	// ref to collection
	const collRef = collection(db, 'users')

    const queryRef = query(collRef, orderBy('email'))

	// get data
	const userQuery = useFirestoreQueryData(['users'], collRef,  {
		idField: 'id',
		subscribe: true,
	})

	console.log('userQuery', userQuery)
    console.log('queryRef', queryRef)

	return userQuery
}

export default useGetUsers