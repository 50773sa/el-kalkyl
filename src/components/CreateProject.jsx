import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import AddMaterialsForm from "./CreateMaterialForm";
import TextField from '@mui/material/TextField'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanel } from '@mui/lab';
import {TabContext} from '@mui/lab';
import TabList from '@mui/lab/Tablist';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { MenuItem } from '@mui/material';
import LeavePageAlert from './modals/LeavePageAlert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';


const CreateProject = () => {
    const [value, setValue] = useState('1')
    const [open, setOpen] = useState(false)
    const [projectName, setProjectName] = useState()


    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
    
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
    
        setChecked(newChecked);
    }

    return (
        <div className='wrapper createProject' id='createProject'>

            <Typography
                variant="h6" 
                component="div" 
                textAlign='start' 
                marginBottom='2rem'
            >
               <strong>Lägg till nytt projekt</strong> 
            </Typography>

            <form onSubmit={() => {}}>
                <Grid container spacing={2}>

                    <Grid item xs={12} style={{ marginBottom: '6rem'}} >
                        <TextField
                            // inputRef={}
                            required
                            fullWidth
                            id="projecttName"
                            label="Projekt"
                            name="projecttName"
                            autoComplete="projectName"
                        />
                    </Grid>

                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable" style={{ marginBottom: '1rem' }}>
                                <Tab className='tab' label="Apparater" value="1" />
                                <Tab className='tab' label="Belysning" value="2" />
                                <Tab className='tab' label="Tele" value="3" />
                            </TabList>
                        </Box>

                        <TabPanel value="1">Item One</TabPanel>
                        <TabPanel value="1">Item two</TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                        <TabPanel value="3">Item Three</TabPanel>
                    </TabContext>

                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', mb:'6rem' }}>
                            {[0, 1, 2, 3].map((value) => {
                                const labelId = `checkbox-list-label-${value}`;

                                return (
                                    <ListItem
                                        key={value}
                                        disablePadding
                                    >
                                        <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                                            <ListItemIcon>
                                                <Checkbox
                                                edge="start"
                                                checked={checked.indexOf(value) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>

                        {/* <Box>
                            <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable">
                                <Tab style={{ fontSize: '0.7rem'}} label="Brytare" value="1" />
                                <Tab style={{ fontSize: '0.7rem'}} label="Uttag" value="1" />
                                <Tab style={{ fontSize: '0.7rem'}} label="Lampdon" value="1" />
                            </TabList>
                        </Box> */}

                </Grid>
            </form>

            <Grid container spacing={2} alignItems='center'>
                <Grid item xs={7}>
                    <span>Valt material</span>
                </Grid>

                <Grid item xs={4}>
                    <TextField
                        required
                        id="select"
                        value={Number}
                        label="Antal"
                        onChange={handleChange}
                        fullWidth
                        select
                    >
                        <MenuItem value={10}>10</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={1}>
                    <DeleteOutlinedIcon />
                </Grid>
            </Grid>

            <Grid className="buttonsWrap">
                <Button 	
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                > Spara
                </Button>
                <Button
                    fullWidth
                    onClick={() => {setOpen( open ? false : true)}}
                > Avbryt
                </Button>
            </Grid>

            <LeavePageAlert open={open} setOpen={setOpen}/> 
        
        </div>
    )
}

export default CreateProject