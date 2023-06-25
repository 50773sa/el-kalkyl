// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Typography from '@mui/material/Typography'

const Header2 = ({ h2 }) => {
    return (
        <Grid xs={12} sx={{ mt: '1rem', height:'50px', backgroundColor: '#e0e0e0' }}>
            <Typography 
                component="div" 
                variant="h2" 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    height: '100%', 
                    px: '1rem',
                    color: '#7b7b7b', 
                    fontSize: '14px', 
                    textTransform: 'upperCase',
                    fontWeight: 600,
                    cursor: "default" 
                }}
            >
                {h2}
            </Typography>    
        </Grid>  
    )
}

export default Header2