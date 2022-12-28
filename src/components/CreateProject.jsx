import React, { useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import AddMaterialsForm from "./AddMaterialsForm";
import TextField from '@mui/material/TextField'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { TabPanel } from '@mui/lab';
import {TabContext} from '@mui/lab';
import TabList from '@mui/lab/Tablist';


const CreateProject = () => {
    const [value, setValue] = useState('1')

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

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

                </Grid>

                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable" style={{ marginBottom: '1rem' }}>
                            <Tab className='tab' label="Apparater" value="1" />
                            <Tab className='tab' label="Belysning" value="2" />
                            <Tab className='tab' label="Tele" value="3" />
                        </TabList>
                    </Box>

                    {/* <Box>
                        <TabList onChange={handleChange} aria-label="lab API tabs example" variant="scrollable">
                            <Tab style={{ fontSize: '0.7rem'}} label="Brytare" value="1" />
                            <Tab style={{ fontSize: '0.7rem'}} label="Uttag" value="1" />
                            <Tab style={{ fontSize: '0.7rem'}} label="Lampdon" value="1" />
                        </TabList>
                    </Box> */}

                    <TabPanel value="1">Item One</TabPanel>
                    <TabPanel value="1">Item two</TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext>
            </form>

            <div className="buttonsWrap">
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
            </div>
        </div>
    )
}

export default CreateProject