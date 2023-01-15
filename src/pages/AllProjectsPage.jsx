import { db } from '../firebase'
import { collection, query, where } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { useAuthContext } from '../contexts/AuthContextProvider'
import AllProjects from '../components/AllProjects'
import Container from '@mui/material/Container'
import LoadingBackdrop from '../components/LoadingBackdrop'

const AllProjectsPage = () => {
	const { currentUser } = useAuthContext()

    const queryRef = query(collection(db, 'projects'),
		where('uid', '==', currentUser.uid),
	)

    const { data: projects, isLoading } = useFirestoreQueryData(
        ['projects', { uid: currentUser.uid}], 
        queryRef, {idField: 'id', subscribe: true, }
    )

    return (
        <Container>
            {isLoading ? <LoadingBackdrop /> : ''}

            {!isLoading 
                ? <AllProjects projects={projects}/>
                : ''
            }
        </Container>
    )
}

export default AllProjectsPage