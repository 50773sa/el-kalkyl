import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { db } from '../../firebase'
import { collection, doc, documentId, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { useForm } from 'react-hook-form';
import useStreamUser from '../../hooks/useStreamUser'
import useStreamCollection from '../../hooks/useStreamDocument'
import LoadingBackdrop from '../LoadingBackdrop'
import LeavePageAlert from '../modals/LeavePageAlert'
import { toast } from 'react-toastify'
// mui
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import Button from '@mui/material/Button'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import { TabList } from '@mui/lab'
import TabPanel from '@mui/lab/TabPanel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { FormControlLabel, InputAdornment } from '@mui/material'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import useStreamDocument from '../../hooks/useStreamDocument'

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';



import ButtonGroup from '@mui/material/ButtonGroup'
import { useNavigate } from 'react-router-dom';

const EditProject = ({ projectId }) => {
	const { currentUser } = useAuthContext()
    const [isChecked, setIsChecked] = useState(false)
    const [selectedItemId, setSelectedItemId] = useState([])


    const { data: material, loading: isStreaming} = useStreamCollection('material')
    const { data: currentProject } = useStreamUser('projects', projectId)



    const [projectName, setProjectName] = useState(null)
    const [num, setNum] = useState([0])    
    const [value, setValue] = useState('Apparater')
    const [selectedProduct, setSelectedProduct] = useState([])
    const [addToDocProducts, setAddToDocProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const numberRef = useRef()
    const navigate = useNavigate()

    const { handleSubmit, formState: { errors }, reset, register, watch, control} = useForm()
    const [checked, setChecked] = useState([])

    //! Under contruction! 🔨


    // Tabs 
    const handleChange = (e, newValue) => {
        e.preventDefault()
        setValue(newValue)
    }


    // const handleToggle = (item) => {
    //     const currentIndex = checked.indexOf(item)
    //     const newChecked = [...checked]
    
    //     if (currentIndex === -1) {
    //       newChecked.push(item)
    //     } else {
    //       newChecked.splice(currentIndex, 1)
    //     }
    
    //     setChecked(newChecked);
    //     console.log('newChecked', newChecked)
    //     console.log('currentIndex', currentIndex)

    // }

    const toggle = (item) => {
        if (selectedItemId.includes(item.id)) {
            setSelectedItemId(selectedItemId.filter(id => id !== item.id))
        } else {
            setSelectedItemId([...selectedItemId, item.id])
        }
    }



    const toggleIsCheckedFromFS = async (item) => {
        setError(null)

        const ref = doc(db, 'material', item.id)
        console.log('ref', ref)
        console.log('item', item)
        try {
          
            // const isChecked = ref.docs.data().isChecked
            // console.log('isChecked*****************', isChecked)
            await updateDoc(ref, {
                isChecked: !item.isChecked
            })

		} catch(err) {
			setError(err)
		}	

    }

    // Add to list
    const handleAdd = (item) => () => {
        setLoading(true)
        // toggleIsCheckedFromFS(item)

        toggle(item)

    
        if (!selectedProduct.includes(item)) {
            setSelectedProduct(selectedProduct => [...selectedProduct, item])

        } else {
            setSelectedProduct(selectedProduct.filter((i) => i?.id !== item.id))   
        }
        setLoading(false)
    }

    // Delete added products from list
    const handleDelete = (selectedItem) => () => {
        setSelectedProduct((items) => items.filter((item) => item?.id !== selectedItem.id))
    }

    //Delete object from FS
    const handleDeleteFromFb = (selectedItem) => async () => {
        await updateDoc(doc(db, 'projects', projectId), {
            projectMaterial: currentProject.projectMaterial.filter(pm => pm.id !== selectedItem.id)
        })
    }


    // console.log('checked', checked)
    console.log('selectedProducts', selectedProduct)



    const handleClick = (item) => (e) => {
        e.preventDefault()
        setError(null)

        if (num === 0) {
            return setLoading(false)
        }
        setNum(Number(numberRef.current.value))
        item.quantity = num    
        console.log('num', num)
        
        
        if (addToDocProducts.includes(item)) {
            return (
                setLoading(false), 
                console.log('Item already exists')
            ) 
        }

        try {
            setLoading(true)
            setAddToDocProducts(selectedProduct => [...selectedProduct, item])
            console.log('addToDocProducts', addToDocProducts)
            setLoading(false)

        } catch(err) {
            setError(err)
            console.log('err', error.message)
            setLoading(false)

        }
    }

    
    const onSubmit = async (inputData) => {
        setError(null)

        if (!inputData) {
            return
        }

        try {
            await updateDoc(doc(db, 'projects', projectId), {
                projectName: inputData.projectName,
                projectMaterial: addToDocProducts 
            })

         
            setSuccess(true)
            toast.success('Sparat!')
            navigate(`/user/${currentUser.uid}/project/${projectId}`)     
            console.log("Success")
            setSelectedProduct([])
            // reset()

        } catch (err) {
            setError(err)
        }

    }


    useEffect(() => {
        setLoading(true)

        if (currentProject === undefined || currentProject.length === 0) {
            return
        }
        setAddToDocProducts(currentProject.projectMaterial)
        setProjectName(currentProject.projectName)

        if (projectName === undefined ) {
            return
        }

        setLoading(false)
        return

    }, [currentProject, projectName])


    console.log('addToDocsProducts', addToDocProducts)


    return (
        <div className='wrapper' id="editProjectWrapper">

            {loading && <LoadingBackdrop /> }

            <Typography variant="h6" component="div" textAlign='start' marginBottom='2rem'>
                <strong>Redigera projekt</strong> 
            </Typography>

            {!loading &&
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={2}>
        
                        <Grid xs={12} sx={{ marginBottom: '3rem'}}>
                            <TextField
                                fullWidth
                                id="projecttName"
                                name="projectName"
                                autoComplete='projectName'
                                onChange={(e) => (setProjectName(e.target.value)) }
                                defaultValue={projectName}


                                {...register("projectName", { 
                                    required: true, 
                                    minLength: { value: 1, message: 'Obligatoriskt fält'}
                                })}
                            >
                                {errors.projectName === 'required' && <p>Obligatoriskt fält</p>} 
                            </TextField>
                        </Grid>
                  
  
                        {/**
                         *  Items from db
                         */}
  
                        <Grid xs={12}>
                            <TabContext value={value}>
                                <Grid xs={12}>
                                    <TabList onChange={handleChange} aria-label="tab list" sx={{ marginBottom: '1rem' }}>
                                        <Tab className='tab' label="Apparater" value="Apparater" />
                                        <Tab className='tab' label="Belysning" value="Belysning" />
                                        <Tab className='tab' label="Data" value="Data" />
                                    </TabList>
                                </Grid>
    
                                <Grid xs={12}>
                                    <TabPanel value="Apparater" sx={{ height: '200px', overflowY: 'scroll' }}>
                                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                            {!isStreaming && material?.filter(list => list.category === "Apparater").map((item) => {
                                                const isChecked = selectedItemId.includes(item.id)

                                                // const labelId = `checkbox-list-label-${item}`;
                                                // console.log('item', item)
                                         
                                                return (
                                                    <div sx={{}}>
                                                        <ListItem 
                                                            key={item.id} 
                                                            value={"Apparater"}
                                                            onClick={handleAdd(item)}
                                                            disableGutters
                                                            sx={{ 
                                                                cursor: 'pointer',  
                                                                display: 'flex', 
                                                                justifyContent: 'space-between', 
                                                                "&:hover": {
                                                                    backgroundColor: "#f1f1f1" 
                                                                }
                                                            }}
                                                        > 
                                                            {item.product}
                                                            {isChecked && <CheckCircleIcon sx={{ color: '#15a715' }} />}
                                                        </ListItem>

                                                    </div>
                                                )
                                            })}
                                        </List>
                                    </TabPanel> 
    
                                    <TabPanel value="Belysning" sx={{ height: '200px', overflowY: 'scroll'}}>
                                        <List>
                                            {!isStreaming && material?.filter(list => list.category === "Belysning").map((item, i) => {
                                                const isChecked = selectedItemId.includes(item.id)

                                                return (
                                                    <ListItem 
                                                        key={i} 
                                                        value={"Belysning"}
                                                        onClick={handleAdd(item)}
                                                        disableGutters
                                                        sx={{ 
                                                            cursor: 'pointer',  
                                                            display: 'flex', 
                                                            justifyContent: 'space-between', 
                                                            "&:hover": {
                                                                backgroundColor: "#f1f1f1" 
                                                            }
                                                        }}
                                                    > 
                                                        {item.product}
                                                        {isChecked && <CheckCircleIcon sx={{ color: '#15a715' }} />}
                                                    </ListItem>
                                                )
                                      
                                            })}
                                        </List>
                                    </TabPanel>
    
                                
                                    <TabPanel value="Data" sx={{ height: '200px', overflowY: 'scroll'}}>
                                        <List>
                                            {!isStreaming && material?.filter(list => list.category === "Data").map((item, i) => {
                                                const isChecked = selectedItemId.includes(item.id)

                                                return (
                                                    <ListItem 
                                                        key={i} 
                                                        value={"Data"}
                                                        onClick={handleAdd(item)}
                                                        disableGutters
                                                        sx={{ 
                                                            cursor: 'pointer',  
                                                            display: 'flex', 
                                                            justifyContent: 'space-between', 
                                                            "&:hover": {
                                                                backgroundColor: "#f1f1f1" 
                                                            }
                                                        }}
                                                    > 
                                                        {item.product}
                                                        {isChecked && <CheckCircleIcon sx={{ color: '#15a715' }} />}

                                                    </ListItem>
                                                )
                                            })}
                                        </List>
                                    </TabPanel>
                                </Grid>
                            </TabContext>
                        </Grid>
                    </Grid>
  
                    {/**
                     *  Update products
                     */}
    
                    <Grid container spacing={2} style={{ marginBottom: "6rem"}} >
                        {currentProject?.projectMaterial?.map((item, i) => (
                            <React.Fragment key={i}>
                                <Grid xs={6} display="flex" justifyContent="center" alignItems="center" key={i}>
                                    <ListItem value={item} > 
                                        {item.product}, {item.quantity}
                                    </ListItem>
                                </Grid>
    
                            
                                <Grid xs={4} display="flex" justifyContent="end" alignItems="center">
    
                                    {/* <RemoveCircleOutlineIcon onClick={() => handleQty(-1, item.quantity)}/> */}
    
                                    <TextField
                                        key={i}
                                        type="number"
                                        id="num"
                                        variant="outlined"
                                        inputRef={numberRef}
                                        onChange={(e) => (setNum(Number(e.target.value)))}
                                        value={num.i}
                                        onClick={handleClick(item)}
                                        size='small'
                                        defaultValue={item.quantity}
                                        
                                        InputProps={{
                                            inputProps: {min: 0, max: 100 },
                                            inputMode: 'numeric', pattern: '[0-9]*',
                                            endAdornment: <InputAdornment position="end">st</InputAdornment>,
                                        }}
                                    
                                    />
    
                                    {/* <AddCircleOutlineIcon  onClick={() => handleQty(+1, item.quantity)}/> */}
                                </Grid>
    
                                <Grid xs={2} display="flex" justifyContent="end" alignItems="center" color="red">
                                    <DeleteForeverIcon  onClick={handleDeleteFromFb(item)} />
                                </Grid>
    
                            </React.Fragment>
                        
                        ))}
    
                        {/**
                         *  Add new products
                         */}
    
                        {selectedProduct?.map((item, i) => (
                            <React.Fragment key={i}>
                                <Grid xs={6} display="flex" justifyContent="center" alignItems="center" key={i}>
                                    <ListItem value={item.product} key={i}> 
                                        {item?.product}, {item?.quantity}
                                    </ListItem>
                                </Grid>
    
                            
                                <Grid xs={4} display="flex" justifyContent="end" alignItems="center">
    
                                    {/* <RemoveCircleOutlineIcon onClick={() => handleQty(-1, item.quantity)}/> */}
                                    <TextField
                                        key={i}
                                        type="number"
                                        id="standard-basic"
                                        name="inputQty"
                                        variant="standard"
                                        inputRef={numberRef}
                                        onChange={(e) => (setNum(Number(e.target.value)))}
                                        value={num.i}
                                        onClick={handleClick(item)}
                                        size='small'
                                        defaultValue={item.quantity}
                                        
                                        
                                        InputProps={{
                                            inputProps: {min: 0, max: 100 },
                                            inputMode: 'numeric', pattern: '[0-9]*',
                                            endAdornment: <InputAdornment position="end">st</InputAdornment>,
                                        }}
                                    
                                    /> 
                                            
                                    
                              
                                </Grid>
    
                                <Grid xs={2} display="flex" justifyContent="end" alignItems="center" color="red">
                                    <DeleteForeverIcon  onClick={handleDelete(item)} />
                                </Grid>
    
                            </React.Fragment>
                        ))}
    
                    </Grid>
    
                    {/**
                     *  Buttons
                     */}

                    <Grid item xs={12} className="buttonsWrap">
                        <Button 	
                            type="submit"
                            onClick={onSubmit}
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
  
            }
            <LeavePageAlert open={open} setOpen={setOpen}/> 

        </div>
    )
}

export default EditProject