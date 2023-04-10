import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { db } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { useForm } from 'react-hook-form';
import useStreamUser from '../../hooks/useStreamUser'
import LoadingBackdrop from '../LoadingBackdrop'
import LeavePageAlert from '../modals/LeavePageAlert'
import Tabs from './Tabs'
import ListItemProject from './ListItemProject'
import SelectedAndCurrentProducts from './SelectedAndCurrentProducts'
import { toast } from 'react-toastify'
// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import TabContext from '@mui/lab/TabContext'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import { useNavigate } from 'react-router-dom';
import SaveOrCancelButtons from '../buttons/SaveOrCancelButtons';


const EditProject = ({ projectId }) => {
	const { currentUser } = useAuthContext()
    const [selectedItemId, setSelectedItemId] = useState([])
    const [projectName, setProjectName] = useState(null)
    const [num, setNum] = useState([0])    
    const [value, setValue] = useState('Apparater')
    const [selectedProduct, setSelectedProduct] = useState([])
    const [addToDocProducts, setAddToDocProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const { data: currentProject } = useStreamUser('projects', projectId)

    const numberRef = useRef()
    const navigate = useNavigate()

    const { handleSubmit, formState: { errors }, reset, register, watch, control} = useForm()

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
            <Grid xs={12} sx={{ height: "60%", margin: '8px', backgroundColor: "#fbfbfb", borderRadius: "0 0 10px 10px", padding: '1rem'}}>

            <Typography variant="h6" component="div" textAlign='start' marginBottom='2rem' sx={{ cursor: "default" }} >
                <strong>Redigera projekt</strong> 
            </Typography>

            {!loading &&
                <form onSubmit={handleSubmit(onSubmit)} noValidate onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}>
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
                                     {/* Tabs */}
                                    <Tabs handleChange={handleChange} />
                                </Grid>
    
                                <Grid xs={12}>
  
                                    <ListItemProject
                                        value="Apparater" 
                                        selectedProduct={selectedProduct} 
                                        setSelectedProduct={setSelectedProduct}
                                    />

                                    <ListItemProject 
                                        value="Belysning" 
                                        selectedProduct={selectedProduct} 
                                        setSelectedProduct={setSelectedProduct}
                                    />


                                    <ListItemProject 
                                        value="Data" 
                                        selectedProduct={selectedProduct} 
                                        setSelectedProduct={setSelectedProduct}
                                    />

                                    <ListItemProject 
                                        value="Ovrigt" 
                                        selectedProduct={selectedProduct} 
                                        setSelectedProduct={setSelectedProduct}
                                    />

                                </Grid>
                            </TabContext>
                        </Grid>
                    </Grid>
  
                    {/**
                     *  Update products
                     */}

                    <SelectedAndCurrentProducts 
                        currentProject={currentProject}
                        projectId={projectId}
                        selectedProduct={selectedProduct}
                        setSelectedProduct={setSelectedProduct}
                        numberRef={numberRef}
                        num={num}
                        setNum={setNum}
                        setError={setError}
                        addToDocProducts={addToDocProducts}
                        setAddToDocProducts={setAddToDocProducts}
                        setLoading={setLoading}
                    />

    
                    {/**
                     *  Buttons
                     */}

                    <SaveOrCancelButtons setOpen={setOpen} />
                </form>
  
            }
                <LeavePageAlert open={open} setOpen={setOpen}/> 
            </Grid>

        </div>
    )
}

export default EditProject