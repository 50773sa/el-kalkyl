import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Tab from '@mui/material/Tab'
import TabList  from '@mui/lab/TabList'

const Tabs = ({ handleChange }) => {
    return (
        <TabList onChange={handleChange} aria-label="tab list" sx={{ display: 'flex', overflow: 'auto' }}>
            <Tab className='tab' label="Apparater" value="Apparater" />
            <Tab className='tab' label="Belysning" value="Belysning" />
            <Tab className='tab' label="Data" value="Data" />
            <Tab className='tab' label="Övrigt" value="Ovrigt" />
        </TabList>
    )
}

export default Tabs