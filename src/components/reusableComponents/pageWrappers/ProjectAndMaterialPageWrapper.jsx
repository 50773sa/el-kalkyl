import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
// components
import TabsLarge from "../../buttons/TabsLarge"
// mui
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded'
import Button from "@mui/material/Button"
import Container from "@mui/system/Container"
import Grid from "@mui/material/Unstable_Grid2/Grid2"

const ProjectAndMaterialPageWrapper = ({ tabsTitleKey1, tabsTitleKey2, isEditPage, isProjectPage, children }) => {
    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <Container>
            <div className='wrapper'>
                <Grid container>

                    <Grid xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <TabsLarge 
                            tabsTitleKey1={tabsTitleKey1}
                            tabsTitleKey2={tabsTitleKey2}
                            isEditPage={isEditPage}
                            isProjectPage={isProjectPage}
                        />
                    </Grid>

                    <Button
                        variant="text"
                        size="large"
                        sx={{ 
                            px: 0, 
                            pt: !isEditPage && !isProjectPage ? 3 : 0,
                            pb: 3,
                            '&:hover': {backgroundColor: 'transparent'}
                        }}
                        onClick={() => navigate(-1)}
                    >
                        <ArrowBackIosRoundedIcon />  
                        {t(`buttons.goBack`, 'Go back')}
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