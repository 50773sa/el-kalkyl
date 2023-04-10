import { useRef, useState } from 'react'
import { db } from '../../firebase'
import { uuidv4 } from '@firebase/util'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import { useForm } from 'react-hook-form'
import ListItemProject from './ListItemProject'
import LoadingBackdrop from '../LoadingBackdrop'
import LeavePageAlert from '../modals/LeavePageAlert'
import SelectedProduct from './SelectedProduct'
import Tabs from './Tabs'
import SaveOrCancelButtons from '../buttons/SaveOrCancelButtons'
import { toast } from 'react-toastify'
// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import TabContext from '@mui/lab/TabContext'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'


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

                <Typography variant="h6" component="div" textAlign='start' marginBottom='2rem' sx={{ cursor: "default" }}>
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
                                    {/* Tabs */}
                                    <Tabs handleChange={handleChange} />
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

                    <SaveOrCancelButtons setOpen={setOpen} />

                </form>

                <LeavePageAlert open={open} setOpen={setOpen}/>        
            </Grid>
        </div>
    )
}

export default CreateProject