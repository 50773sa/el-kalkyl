import { useRef, useState } from 'react'
import { db } from '../../firebase'
import { uuidv4 } from '@firebase/util'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import { useForm } from 'react-hook-form'
import ListItemProject from './ListItemProject'
import LoadingBackdrop from '../LoadingBackdrop'
import LeavePageAlert from '../modals/LeavePageAlert'
import { toast } from 'react-toastify'
// mui
import Button from '@mui/material/Button'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList  from '@mui/lab/TabList'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import SelectedProduct from './SelectedProduct'



const CreateProject = () => {
    const [num, setNum] = useState([0])
    const [value, setValue] = useState('Apparater')
    const [selectedProduct, setSelectedProduct] = useState([])
    const [addToDocProducts, setAddToDocProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const numberRef = useRef()
    const { currentUser } = useAuthContext()
    const { handleSubmit, formState: { errors }, reset, register } = useForm()

    // tabs
    const handleChange = (e, newValue) => {
        e.preventDefault()
        setValue(newValue)
    }

    // add to list
    const handleAdd = (item) => () => {
        selectedProduct.includes(item)
            ?   setSelectedProduct(selectedProduct.filter(selected => selected !== item))
            :   setSelectedProduct(selectedProduct => [...selectedProduct, item])
    }
    

    const handleDelete = (selectedItem) => () => {
        setSelectedProduct((items) => items.filter((item) => item.id !== selectedItem.id))
    }

    // handle selected items
    const handleClick = (item) => (e) => {
        e.preventDefault()
        setError(null)

        if (num === 0) {
            return setLoading(false), console.log('No products')
        }

        setNum(Number(numberRef.current.value))
        item.quantity = num

        if (addToDocProducts.includes(item)) {
            setLoading(false)
            return 
        }

        try {
            setLoading(true)
            setAddToDocProducts(selectedProduct => [...selectedProduct, item])

            setLoading(false)

        } catch(err) {
            setError(err)
            setLoading(false)

        }
    }


    const onSubmit = async (inputData) => {
        setError(null)

        if (!inputData) {
            return
        }

        try {
            await addDoc(collection(db, 'projects'), {
                uid: currentUser.uid,
                id: uuidv4(),
                completed: false,
                created: serverTimestamp(),
                projectName: inputData.projectName,
                projectMaterial: addToDocProducts
            })
            setSuccess(true)
            toast.success('Sparat!')
            setAddToDocProducts(null)
            setSelectedProduct(null)
            reset()

        } catch (err) {
            setError(err)
        }
    }


    return (
        <div className='wrapper createProject' id='createProjectWrapper'>

            {loading && <LoadingBackdrop /> }
            <Grid xs={12} sx={{ height: "60%", margin: '8px', backgroundColor: "#fbfbfb", borderRadius: "0 0 10px 10px", padding: '1rem'}}>

                <Typography variant="h6" component="div" textAlign='start' marginBottom='2rem'>
                    <strong>Lägg till nytt projekt</strong> 
                </Typography>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid container spacing={2}>
                        <Grid xs={12} style={{ marginBottom: '3rem'}} >
                            <TextField
                                required
                                fullWidth
                                id="projecttName"
                                label="Projekt"
                                name="projectName"
                                autoComplete="off"
                                defaultValue=""

                                {...register("projectName", { 
                                    required: true, 
                                    minLength: { value: 1, message: 'Obligatoriskt fält'}
                                })}
                            >
                            {errors.projectName === 'required' && <p>Obligatoriskt fält</p>}
                            </TextField>

                        </Grid>

                        {/**
                         *  Lists
                         */}

                        <Grid xs={12}>
                            <TabContext value={value} padding={0}>
                                <Grid xs={12} padding={0}>
                                    <TabList onChange={handleChange} aria-label="tab list" style={{ display: 'flex', overflowX: 'scroll' }}>
                                        <Tab className='tab' label="Apparater" value="Apparater" />
                                        <Tab className='tab' label="Belysning" value="Belysning" />
                                        <Tab className='tab' label="Data" value="Data" />
                                        <Tab className='tab' label="Övrigt" value="Ovrigt" />
                                    </TabList>
                                </Grid>

                                <Grid xs={12} sx={{ paddingLeft: 0, paddingRight: 0 }}>

                                    <ListItemProject 
                                        value="Apparater" 
                                        selectedProduct={selectedProduct} 
                                        handleAdd={handleAdd}
                                    />

                                    <ListItemProject 
                                        value="Belysning" 
                                        selectedProduct={selectedProduct} 
                                        handleAdd={handleAdd}
                                    />


                                    <ListItemProject 
                                        value="Data" 
                                        selectedProduct={selectedProduct} 
                                        handleAdd={handleAdd}
                                    />

                                    <ListItemProject 
                                        value="Ovrigt" 
                                        selectedProduct={selectedProduct} 
                                        handleAdd={handleAdd}
                                    />

                                   
                                </Grid>
                            </TabContext>
                        </Grid>
                    </Grid>

                    {/**
                     *  Selected products
                     */}

                    <SelectedProduct
                        selectedProduct={selectedProduct}
                        numberRef={numberRef}
                        num={num}
                        setNum={setNum}
                        handleClick={handleClick}
                        handleDelete={handleDelete}
                    />


                    {/**
                     *  Buttons
                     */}

                    <Grid xs={12} md={4} className="buttonsWrap">
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
            </Grid>
        </div>
    )
}

export default CreateProject