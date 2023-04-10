import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Tab from '@mui/material/Tab'
import TabList  from '@mui/lab/TabList'

const Tabs = ({ handleChange }) => {
    return (
        <Grid xs={12} padding={0}>
            <TabList onChange={handleChange} aria-label="tab list" style={{ display: 'flex', overflowX: 'scroll' }}>
                <Tab className='tab' label="Apparater" value="Apparater" />
                <Tab className='tab' label="Belysning" value="Belysning" />
                <Tab className='tab' label="Data" value="Data" />
                <Tab className='tab' label="Övrigt" value="Ovrigt" />
            </TabList>
        </Grid>
    )
}

export default Tabs