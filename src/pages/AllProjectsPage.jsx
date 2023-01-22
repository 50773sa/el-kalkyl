
import AllProjects from '../components/project/AllProjects'
import LoadingBackdrop from '../components/LoadingBackdrop'
import useGetAuthColl from '../hooks/useGetAuthColl'
import Container from '@mui/material/Container'

const AllProjectsPage = () => {
    const { data: projects, isLoading } = useGetAuthColl('projects')

    
    return (
        <Container>
            {isLoading && <LoadingBackdrop /> }

            {!isLoading &&
                <AllProjects projects={projects}/>
            }
        </Container>
    )
}

export default AllProjectsPage