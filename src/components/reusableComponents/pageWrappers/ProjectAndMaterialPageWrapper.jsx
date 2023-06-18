import TabsLarge from "../../buttons/TabsLarge"
// mui
import Container from "@mui/system/Container"
import Grid from "@mui/material/Unstable_Grid2/Grid2"

const ProjectAndMaterialPageWrapper = ({ tabTitle1, tabTitle2, children }) => {
    return (
        <Container>
            <div className='wrapper'>
                <Grid container spacing={2}>
                    <TabsLarge 
                        title1={tabTitle1}
                        title2={tabTitle2}
                    />
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