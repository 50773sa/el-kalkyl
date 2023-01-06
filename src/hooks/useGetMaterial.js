import { db } from '../firebase'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where } from 'firebase/firestore'

import { useAuthContext } from '../contexts/AuthContextProvider'
import useStreamDoc from './useStreamDoc'
import useStreamCollection from './useStreamCollection'

const useGetMaterial = () => {
	const { currentUser } = useAuthContext()

	// ref to collection
	const queryRef = query(collection(db, 'material'), where('uid', '==', currentUser.uid))

	// get data
	const projectQuery = useFirestoreQueryData(["material"],queryRef, {
		idField: 'id',
		subscribe: true,			
	})

	console.log('projectQuery', projectQuery)

	return projectQuery
}

export default useGetMaterial