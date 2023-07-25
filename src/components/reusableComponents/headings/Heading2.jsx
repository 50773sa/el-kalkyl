// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Typography from '@mui/material/Typography'

const Heading2 = ({ h2 }) => {
    return (
        <Grid xs={12} sx={{ height:'50px', backgroundColor: '#e0e0e0', marginBottom: 4 }}>
            <Typography 
                component="div" 
                variant="h1" 
                sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    px: 1,
                    height: '100%', 
                    color: '#606060', 
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

export default Heading2