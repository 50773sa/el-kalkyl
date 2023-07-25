// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Typography from '@mui/material/Typography'

const Heading1 = ({ h1 }) => {
    return (
        <Grid xs={12} sx={{ height:'50px', backgroundColor: '#e0e0e0', marginBottom: 4 }}>
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
    )
}

export default Heading1