import { useTranslation } from 'react-i18next'
// mui
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid"

const SaveOrCancelButtons = ({ setOpen, isSubmitting }) => {
    const { t } = useTranslation()
    
    return (
        <Grid container alignItems="center" justifyContent='end'>
            <Grid
                alignItems="center"
                order={{ xs: 0, md: 1 }}
                sx={{ 
                    textAlign: {xs: 'center', md: 'end'}, 
                    my: 4,
                }}
                size={{
                    xs: 12,
                    md: 4,
                    lg: 2.5
                }}>
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
            <Grid
                size={{
                    xs: 12,
                    md: "auto"
                }}>
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
    );
}

export default SaveOrCancelButtons