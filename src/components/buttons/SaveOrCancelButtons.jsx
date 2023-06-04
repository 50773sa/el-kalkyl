// mui
import Button from '@mui/material/Button'
import Grid from "@mui/material/Unstable_Grid2/Grid2"

const SaveOrCancelButtons = ({ setOpen }) => {
    return (
        <Grid container>
            <Grid xs={12} md={3}>
                <Button 	
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                > Spara
                </Button>
            </Grid>
            <Grid xs={12} md={2} display="flex" alignItems="center">
                <Button
                    fullWidth
                    disableRipple
                    onClick={() => {setOpen( open ? false : true)}}
                > Avbryt
                </Button>
            </Grid>
        </Grid>
    )
}

export default SaveOrCancelButtons