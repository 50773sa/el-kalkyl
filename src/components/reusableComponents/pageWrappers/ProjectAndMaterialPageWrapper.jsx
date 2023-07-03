import { useNavigate } from "react-router-dom"
import TabsLarge from "../../buttons/TabsLarge"
// mui
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import Button from "@mui/material/Button"
import Container from "@mui/system/Container"
import Grid from "@mui/material/Unstable_Grid2/Grid2"

const ProjectAndMaterialPageWrapper = ({ tabTitle1, tabTitle2, children }) => {
    const navigate = useNavigate()

    return (
        <Container>
            <div className='wrapper'>
                <Grid container>

                    <Grid xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TabsLarge 
                            title1={tabTitle1}
                            title2={tabTitle2}
                        />
                    </Grid>

                    <Button
                        variant="text"
                        size="large"
                        sx={{ px: 0, py: 3 }}
                        onClick={() => navigate(-1)}
                        
                    >
                        <ArrowBackIosRoundedIcon />  Tillbaka
                    </Button>
                  
                    <Grid 
                        xs={12}
                        sx={{ 
                            height: "80%", 
                            pb: 6, 
                            backgroundColor: "#fbfbfb", 
                            borderRadius: "0 0 10px 10px"
                        }}
                    >
                        { children }
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}

export default ProjectAndMaterialPageWrapper