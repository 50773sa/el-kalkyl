// mui
import Button from '@mui/material/Button'
import Grid from "@mui/material/Unstable_Grid2/Grid2"

const SaveOrCancelButtons = ({ setOpen, success }) => {
    return (
        <Grid xs={12} display="flex" justifyContent="center" flexDirection="column" alignItems="start" className="buttons">
            <Grid xs={12} md={3}>
                <Button 	
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, p: 1 }}
                > Spara
                </Button>
                <Button
                    fullWidth
                    disableRipple
                    onClick={() => {!success ? setOpen(true) : ''}}
                    > Avbryt
                </Button>
            </Grid>

        </Grid>

    )
}

export default SaveOrCancelButtons