import Tab from '@mui/material/Tab'
import TabList  from '@mui/lab/TabList'

const Tabs = ({ handleChange, category }) => {
    return (
        <TabList onChange={handleChange} aria-label="tab list" sx={{ display: 'flex', overflow: 'auto' }}>
            {category?.map((c) => (
                <Tab key={c.value} className='tab' label={c.value} value={c.value} />
            ))}
        </TabList>
    )
}

export default Tabs