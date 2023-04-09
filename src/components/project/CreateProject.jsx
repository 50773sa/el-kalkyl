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
            // reset()

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

                <form onSubmit={handleSubmit(onSubmit)} noValidate onKeyDown={(e) => e.key === "Enter" && e.preventDefault()} >
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
                     *  Selected products
                     */}

                    <SelectedProduct
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

                    <Grid container>
                        <Grid xs={12} md={3}>
                            <Button 	
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            > Spara
                            </Button>
                        </Grid>
                        <Grid xs={12} md={2} display="flex" alignItems="center">
                            <Button
                                fullWidth
                                disableRipple
                                onClick={() => {setOpen( open ? false : true)}}
                            > Avbryt
                            </Button>
                        </Grid>
                    </Grid>

                </form>

                <LeavePageAlert open={open} setOpen={setOpen}/>        
            </Grid>
        </div>
    )
}

export default CreateProject