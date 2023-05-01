import { useState, useRef, useEffect} from "react"

import AllProjects from '../components/project/AllProjects'
import CreateProject from "../components/project/CreateProject"

import LoadingBackdrop from '../components/LoadingBackdrop'
import TabsLarge from '../components/buttons/TabsLarge'
import useGetAuthColl from '../hooks/useGetAuthColl'
import useStreamCollection from "../hooks/useStreamCollection"

// mui
import Container from '@mui/material/Container'

import Grid from "@mui/material/Unstable_Grid2/Grid2"
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined'
import DataSaverOnOutlinedIcon from '@mui/icons-material/DataSaverOnOutlined';
import HomeTable from '../components/HomeTable'
import Cards from "../components/Cards"


const AllProjectsPage = () => {
    const [isActive, setIsActive] = useState(true)
    const { data: projects, isLoading, isError } = useGetAuthColl('projects')
    const { data: material, loading} = useStreamCollection('material')
    // const { data: projects } = useStreamCollection('projects')

    return (
        <Container>
            <div className='wrapper'>

                    {/* {isLoading || loading  && <LoadingBackdrop /> } */}
                    {/* {isError && <p>An error occoured...</p>} */}


                    {/* <TabsLarge 
                        title1='Projekt'
                        title2="Nytt projekt"
                        icon1={<SummarizeOutlinedIcon sx={{ fontSize: '2em', color: '#68A5EC' }}/>}
                        icon2={<DataSaverOnOutlinedIcon sx={{ fontSize: '2rem', color: '#68C37C' }}/>}
                        color1="#68A5EC"
                        color2="#68C37C"
                        isActive={isActive}
                        setIsActive={setIsActive}
                   
                    /> */}
                <Grid container spacing={2}>

                    <TabsLarge 
                        title1="Alla projekt"
                        title2="Nytt projekt"
                        isActive={isActive}
                        setIsActive={setIsActive}
                    />
                    
                    <Grid xs={12} sx={{ height: "80%", pb: 6, backgroundColor: "#fbfbfb", borderRadius: "0 0 10px 10px" }}>
                        {projects && !loading && material && (
                            isActive 
                                ?   <AllProjects projects={projects}/>
                                :   <CreateProject material={material}/>
                                
                        )}
                    </Grid>
                </Grid>


            </div>
            
        </Container>
    )
}

export default AllProjectsPage