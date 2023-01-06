import React from 'react';
import { useEffect, useRef, useState } from 'react'
import { db } from '../firebase'
import { addDoc, collection  } from 'firebase/firestore';
import { useAuthContext } from '../contexts/AuthContextProvider';
import { useForm } from 'react-hook-form';

import LeavePageAlert from './modals/LeavePageAlert'
import useStreamCollection from '../hooks/useStreamCollection';

// mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import MenuItem from '@mui/material/MenuItem'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import { TabList } from '@mui/lab';
import TabPanel from '@mui/lab/TabPanel';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { InputAdornment } from '@mui/material';



const CreateProject = () => {
    const [loading, setLoading] = useState(true)
    const [value, setValue] = useState('Apparater')
    const [num, setNum] = useState()

    const [open, setOpen] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [projectName, setProjectName] = useState()
    const [checked, setChecked] = useState([0])
    const [selectedProduct, setSelectedProduct] = useState([])
    console.log('selectedProduct', selectedProduct)


    const { data: material, loading: isStreaming} = useStreamCollection('material', 'Apparater')

    const projectRef = useRef()
    const { currentUser } = useAuthContext()
    const { handleSubmit, formState: { errors }, reset, register, control } = useForm()


    const handleChange = (event, newValue) => {
      setValue(newValue);
    }

    const handleDelete = (selectedItem) => () => {
        setSelectedProduct((items) => items.filter((item) => item.id !== selectedItem.id));
    };

    const onSubmit = async (inputData) => {
        console.log('inputData', inputData)
        setError(null)
        console.log('projectRef', projectRef)
        setProjectName(projectRef.current.value)
        console.log('projectName', projectName)


        try {
            await addDoc(collection(db, 'project'), {
                uid: currentUser.uid,
                id: projectRef.current.value
        
            })
            setSuccess(true)
            setOpen(true)
            // reset()

        } catch (err) {
            setError(err)
            console.log('errors.message', errors.message)
            console.log('err.message', err.message)
        }
    }

    return (
        <div className='wrapper createProject' id='createProjectWrapper'>

                <Typography
                    variant="h6" 
                    component="div" 
                    textAlign='start' 
                    marginBottom='2rem'
                >
                <strong>Lägg till nytt projekt</strong> 
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>


                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ marginBottom: '6rem'}} >
                        <TextField
                            inputRef={projectRef}
                            required
                            fullWidth
                            id="projecttName"
                            label="Projekt"
                            name="projectName"
                            autoComplete="projectName"

                            {...register("projectName", { 
                                required: true, 
                                minLength: { value: 1, message: 'Obligatoriskt fält'}
                            })}
                        />
                        {errors.projectName === 'required' && <p>Obligatoriskt fält</p>}

                    </Grid>

                    {/**
                     *  Lists
                     */}

                    <Grid xs={12}>
                        <TabContext value={value}>
                            <Grid>
                                <TabList onChange={handleChange} aria-label="tab list" style={{ marginBottom: '1rem' }}>
                                    <Tab className='tab' label="Apparater" value="Apparater" />
                                    <Tab className='tab' label="Belysning" value="Belysning" />
                                    <Tab className='tab' label="Tele" value="Tele" />
                                </TabList>
                            </Grid>

                            <Grid xs={12} style={{ border: '1px solid #cacaca'}}>
                                <TabPanel value="Apparater" style={{ height: '200px'}}>
                                    <List>
                                        {material?.filter(list => list.category === "Apparater").map((item, i) => (
                                            <ListItem 
                                                key={i} 
                                                value={i.product}
                                                onClick={() => (setSelectedProduct(selectedProduct => [...selectedProduct, item]))}
                                                disableGutters
                                                {...register("product", {
                                                    required: true, 
                                                    minLength: { value: 1, message: 'Obligatoriskt fält'}
                                                })}
                                            > {item.product}
                                            </ListItem>
                                        ))}
                                    </List>
                                </TabPanel> 

                                <TabPanel value="Belysning" style={{ height: '200px'}}>
                                    <List>
                                        {material?.filter(list => list.category === "Belysning").map((item, i) => (
                                            <ListItem 
                                                key={i} 
                                                value={i.product}
                                                onClick={() => (setSelectedProduct(selectedProduct => [...selectedProduct, item]))}
                                                disableGutters
                                            > {item.product}
                                            </ListItem>
                                        ))}
                                    </List>
                                </TabPanel>

                            
                                <TabPanel value="Tele" style={{ height: '200px'}}>
                                    <List>
                                        {material?.filter(list => list.category === "Tele").map((item, i) => (
                                            <ListItem 
                                                key={i} 
                                                value={i.product}
                                                onClick={() => (setSelectedProduct(selectedProduct => [...selectedProduct, item]))}
                                                disableGutters
                                            > {item.product}
                                            </ListItem>
                                        ))}
                                    </List>
                                </TabPanel>
                            </Grid>
                        </TabContext>
                    </Grid>
                </Grid>

                {/**
                 *  Selected products
                 */}

                <Grid container spacing={2} xs={12} alignItems='center'>
                    <Grid item xs={12}>
                        <List>
                            {selectedProduct ? selectedProduct?.map((item, i) => (
                                <ListItem
                                    value={item}
                                    key={item.id}
                                    style={{ display: 'flex', justifyContent: 'space-between'}}
                                > 
                                    {item.product}

                                    <TextField
                                        key={i}
                                        type="number"
                                        variant="outlined"
                                        onChange={(e) => setNum(e.target.value)}
                                        value={num}
                                        size='small'
                                        defaultValue='0'
                                        style={{ width: '30%'}}
                                        InputProps={{
                                            inputMode: 'numeric', pattern: '[0-9]*',
                                            endAdornment: <InputAdornment position="end">st</InputAdornment>,
                                        }}
                                    >
                                    </TextField>
                                    <DeleteOutlinedIcon 
                                        onClick={handleDelete(item)}
                                    />
                                </ListItem>
                            )): ''}
                        </List>
                    </Grid>
                </Grid>

            {/**
             *  Buttons
             */}

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
        </form>


            <LeavePageAlert open={open} setOpen={setOpen}/> 
        
        </div>
    )
}

export default CreateProject