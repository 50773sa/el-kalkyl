// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Typography from '@mui/material/Typography'

const Header2 = ({ h2 }) => {
    return (
        <Grid xs={12} sx={{ mt: '1rem', height:'50px', backgroundColor: 'lightGrey' }}>
            <Typography 
                component="div" 
                variant="h2" 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    height: '100%', 
                    px: '1rem',
                    color: '#5f5f5f', 
                    fontSize: '16px', 
                    textTransform: 'upperCase',
                    cursor: "default" 
                }}
            >
                {h2}
            </Typography>    
        </Grid>  
    )
}

export default Header2