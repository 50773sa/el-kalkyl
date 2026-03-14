import { db } from '../firebase'
import { collection, query, where } from 'firebase/firestore'
import { useCollectionQuery  } from '@tanstack-query-firebase/react/firestore'
import { useAuthContext } from '../contexts/AuthContextProvider'

const useGetAuthColl = (coll) => {
	const { currentUser } = useAuthContext()
	
	// ref to collection
	const queryRef = currentUser 
		? 	query(
				collection(db, coll), 
				where('uid', '==', currentUser.uid)
			)
		: 	null

    const userQuery = useCollectionQuery(queryRef, {
		queryKey: [coll, currentUser.uid],
		subscribe: true,
		idField: 'id',
	})

	const queryList = userQuery.data?.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

	return {
    	...userQuery,		
    	data: queryList,
	}
}

export default useGetAuthColl