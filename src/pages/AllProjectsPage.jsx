import { useState, useRef, useEffect} from "react"

import AllProjects from '../components/project/AllProjects'
import CreateProject from "../components/project/CreateProject"

import LoadingBackdrop from '../components/LoadingBackdrop'
import TableButton from '../components/buttons/TableButton'
import useGetAuthColl from '../hooks/useGetAuthColl'
import useStreamCollection from "../hooks/useStreamCollection"

// mui
import Container from '@mui/material/Container'

const AllProjectsPage = () => {
    const [isActive, setIsActive] = useState(true)
    const { data: projects, isLoading, isError } = useGetAuthColl('projects')
    const { data: material, loading} = useStreamCollection('material')

    return (
        <Container>
            <div className='wrapper' id='addMaterial'>

                    {isLoading || loading  && <LoadingBackdrop /> }
                    {isError && <p>An error occoured...</p>}

                    <TableButton 
                        title1="Alla projekt"
                        title2="Nytt projekt"
                        isActive={isActive}
                        setIsActive={setIsActive}
                    />

                    {!isLoading && projects && !loading && material && (
                        isActive 
                            ?   <AllProjects projects={projects}/>
                            :   <CreateProject material={material}/>
                        
                    )}
                
            </div>
            
        </Container>
    )
}

export default AllProjectsPage