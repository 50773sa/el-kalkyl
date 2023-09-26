import { useTranslation } from 'react-i18next'
// mui
import Button from '@mui/material/Button'
import Grid from "@mui/material/Unstable_Grid2/Grid2"

const SaveOrCancelButtons = ({ setOpen, isSubmitting }) => {
    const { t } = useTranslation()
    
    return (
        <Grid container alignItems="center" justifyContent='end'>
            <Grid xs={12} md={4} lg={2.5} alignItems="center"
                order={{ xs: 0, md: 1 }} 
                sx={{ 
                    textAlign: {xs: 'center', md: 'end'}, 
                    my: 4,
                }}
            >
                <Button
                    type="submit"
                    variant='contained'
                    size="large"
                    disabled={isSubmitting ? true : false}
                    sx={{
                        backgroundColor: '#68C37C',
                        width: {xs: '100%', md: '200px'},
                        height: '50px',
                        '&:hover': {backgroundColor: '#47B15E'},
                    }}
                >
                    {t(`buttons.save`, 'Save')}
                </Button>
            </Grid>

            <Grid xs={12} md="auto">
                <Button 
                    type="button"
                    variant='text'
                    size="large"    
                    disabled={isSubmitting ? true : false}
                    sx={{
                        width: {xs: '100%', md: 'fit'},
                        height: '50px',
                        textDecoration: 'underline',
                        '&:hover': {backgroundColor: 'transparent'},
                    }}
                    onClick={() => setOpen(true)}
                >
                    {t(`buttons.cancel`, 'Cancel')}
                </Button>
            </Grid>
        </Grid>
    )
}

export default SaveOrCancelButtons