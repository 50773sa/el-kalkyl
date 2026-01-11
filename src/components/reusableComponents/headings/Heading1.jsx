import { useTranslation } from "react-i18next"
// components
import EditButton from "../../buttons/EditButton"
// mui
import Grid from "@mui/material/Grid"
import Typography from '@mui/material/Typography'

const Heading1 = ({ h1, icon, isEditBtn, onclick, buttonText }) => {
    const { t } = useTranslation()

    return (
        <Grid container sx={{ justifyContent: 'space-between', height:'50px', backgroundColor: '#e0e0e0', marginBottom: 2 }}>
            <Grid
                size={{
                    xs: 7,
                    sm: 8,
                    md: 9
                }}>
                <Typography 
                    component="div" 
                    variant="h1" 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        height: '100%', 
                        px: 2,
                        color: '#606060', 
                        fontSize: '14px', 
                        textTransform: 'upperCase',
                        fontWeight: 600,
                        cursor: "default" 
                    }}
                >
                   {h1}
                </Typography>  
            </Grid>
            <Grid
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: 2 }}
                size={{
                    xs: 5,
                    sm: 4,
                    md: 2
                }}>
                {icon}

                {isEditBtn && (
                    <EditButton onClick={onclick} />
                )}
            </Grid>
        </Grid>
    );
}

export default Heading1