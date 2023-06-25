import { useState, useRef, useEffect} from "react"

import AllProjects from '../components/project/AllProjects'
import CreateProject from "../components/project/CreateProject"

import LoadingBackdrop from '../components/LoadingBackdrop'
import TabsLarge from '../components/buttons/TabsLarge'
import useGetAuthColl from '../hooks/useGetAuthColl'
import useStreamCollection from "../hooks/useStreamCollection"
import useViewStore from '../store/useViewStore'
// mui
import Container from '@mui/material/Container'

import Grid from "@mui/material/Unstable_Grid2/Grid2"
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined'
import DataSaverOnOutlinedIcon from '@mui/icons-material/DataSaverOnOutlined';
import HomeTable from '../components/userHome/HomeTable'
import Cards from "../components/userHome/Cards"


const AllProjectsPage = () => {
    const [isActive, setIsActive] = useState(true)
    const { data: projects, isLoading, isError } = useGetAuthColl('projects')
    const { data: material, loading} = useStreamCollection('material')
    // const { data: projects } = useStreamCollection('projects')
	const isCurrentView = useViewStore((state) => state.isCurrentView)
    console.log('isCurrentView', isCurrentView)

 

    return (
        <Container>
            <div className='wrapper'>

                    {isLoading || loading  && <LoadingBackdrop /> }
                    {isError && <p>An error occoured...</p>}

                <Grid container spacing={2}>

                    <TabsLarge 
                        title1="Alla projekt"
                        title2="Nytt projekt"
                    />
                    
                    <Grid xs={12} sx={{ height: "80%", pb: 6, backgroundColor: "#fbfbfb", borderRadius: "0 0 10px 10px" }}>
                        {projects && !loading && material && (

                            isCurrentView.collection 
                                ?   <AllProjects projects={projects} />
                                :   <CreateProject material={material} />
                                                        
                        )}
                    </Grid>
                </Grid>

            </div>
            
        </Container>
    )
}

export default AllProjectsPage