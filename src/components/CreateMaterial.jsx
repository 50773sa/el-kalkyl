import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'
import { uuidv4 } from "@firebase/util"
import { useAuthContext } from "../contexts/AuthContextProvider"
import LeavePageAlert from "./modals/LeavePageAlert"
import { toast } from "react-toastify"
// mui
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

// dropdowns
const unitsList = [
    {unit: 'st', value: 'st'},
    {unit: 'm', value: 'm'}
]

const minutesList = [
    {minutes: 0.25, value: 15},
    {minutes: 0.5, value: 30},
    {minutes: 0.75, value: 45}, 
]
const quantity = [...new Array(101)].map((each, index) => ({ qty: index, value: index }))
const hours = [...new Array(12)].map((each, index) => ({ hours: index, value: index }))


const CreateMaterial = () => {
    const [open, setOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    const [inputError, setInputError] = useState(false)
    const [extraItems, setExtraItems] = useState([])
    const fittingsRef = useRef(null)
    const qtyRef = useRef(null)
    const unitRef = useRef(null)
    const { currentUser } = useAuthContext()
    const { handleSubmit, reset, register, formState: { errors } } = useForm()


    const handleObjectInput = () => {

        if(fittingsRef?.current.value === "" || qtyRef.current.value === "" || unitRef.current.value === "") {
            console.log("Obligatiskt fält")
            setInputError(true)
            return 
        }

        let items = {
            id: uuidv4(),
            fittings: fittingsRef.current.value,
            quantity: qtyRef.current.value,
            unit: unitRef.current.value,
        }

        setExtraItems(extraItems => [...extraItems, items])
        setInputError(false)
        reset()
    }
    console.log('extraItems', extraItems)

    const handleDelete = (selectedItem) => () => {
        setExtraItems((items) => items.filter((item) => item.id !== selectedItem.id))
    }

    const onSubmit = async (inputData) => {
        console.log('inputData', inputData)
        setError(null)

        try {
            await addDoc(collection(db, 'material'), {
                id: uuidv4(),
                uid: currentUser.uid,
                product: inputData.product,
                quantity: 0,
                extraItems: extraItems,
                estimatedTime: {
                    hours: inputData.hours,
                    minutes: inputData.minutes,
                },
                category: inputData.category,
            })
            setSuccess(true)
            toast.success('Sparat!')
            // reset()

        } catch (err) {
            setError(err)
            console.log('err.message', err.message)
        }
    }

    return (
        <div className='wrapper addMaterial' id='addMaterial'>

            <Typography
                variant="h6" 
                component="div" 
                textAlign='start' 
                marginBottom='2rem'
            >
               <strong>Lägg till nytt material</strong> 
            </Typography>
    

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2}>

                    {/**
                     *  Product
                     */}

                    <Grid xs={12}>
                        <TextField
                            id="product"
                            label="Produkt"
                            name="product"
                            autoComplete="product"
                            fullWidth
                            required

                            {...register("product", {required: true})}
                        />
                    </Grid>

                    <Grid xs={12} sm={5}>
                        <TextField
                            required
                            type="text"
                            id="fittings"
                            label="Tillbehör"
                            name="fittings"
                            autoComplete="fittings"
                            fullWidth
                            inputRef={fittingsRef}
                            defaultValue=''
                        />
                    </Grid> 

                    {/**
                     *  Quantity
                     */}

                    <Grid xs={5} sm={3} >
                        <TextField
                            select
                            required
                            id="qty"
                            label="Antal"
                            fullWidth
                            inputRef={qtyRef}
                            defaultValue=""
                        >
                            {quantity.map((val) => (
                                <MenuItem key={val.qty} value={val.qty}>
                                    {val.value}
                                </MenuItem>

                            ))}
                        </TextField>
                    </Grid>

                    {/**
                     *  Units
                     */}

                    <Grid xs={5} sm={3}>
                        <TextField
                            id="unit"
                            select
                            required
                            label="st/m"
                            fullWidth
                            inputRef={unitRef}
                            defaultValue=""
                        >
                               
                            {unitsList.map((option) => (
                                <MenuItem key={option.unit} value={option.unit}>
                                    {option.value}
                                </MenuItem>
                            ))}

                        </TextField>
                     </Grid>

                     <Grid 
                        xs={2} 
                        sm={1}
                        display='flex' 
                        alignItems="center" 
                        justifyContent="end" 
                   
                    >
                        <AddCircleIcon fontSize="large" onClick={handleObjectInput} />    
                    </Grid> 

                     {/**
                      *  List of selected fittings
                      */}

                    <Grid xs={12} sm={8} md={6} lg={4} mb={10} >
                            {extraItems?.map((item) => (
                                <List key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <ListItem>{item.fittings}</ListItem>
                                    <ListItem>{item.quantity} {item.unit}</ListItem>
                                    <RemoveCircleOutlineIcon onClick={handleDelete(item)} sx={{ color: "#ff0000"}}/>
                                </List>
                            ))}
                    </Grid>
                
          

                    {/**
                      *  Estimated time
                      */}

                     <Grid  xs={12}>
                        <Typography variant="h6" component="div">Tidsetimering</Typography>
                    </Grid>


                     <Grid xs={6} sm={3}>
                        <TextField
                            select
                            label="Tim"
                            fullWidth
                            required

                            {...register("hours", { required: true })}
                        >
                            {hours.map((option) => (
                                <MenuItem key={option.hours} value={option.hours}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                     </Grid>


                     <Grid xs={6} sm={3}>
                        <TextField
                            select
                            label="Min"
                            fullWidth
                            required

                            {...register("minutes", { required: true })}
                        >
                            {minutesList.map((option) => (
                                <MenuItem key={option.minutes} value={option.minutes}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                     </Grid>
                     <br/>

                     {/**
                      *  Category
                      */}

                    <Grid xs={12} >
                        <TextField
                            select
                            label="Kategori"
                            fullWidth
                            required
                            style={{ marginBottom: '6rem'}}

                            {...register("category", { required: true })}>

                            <MenuItem value={'Apparater'}>Apparater</MenuItem>
                            <MenuItem value={'Belysning'}>Belysning</MenuItem>
                            <MenuItem value={'Tele'}>Tele</MenuItem>
                        </TextField>
                    </Grid>        
                </Grid>

                {inputError ? <p className="error">Alla fält är obligatoriska!</p> : ''}

                <div className="buttons">
                    <Button 	
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    > Spara
                    </Button>
                    <Button
                        fullWidth
                        onClick={() => {!success ? setOpen(true) : ''}}
                    > Avbryt
                    </Button>
                </div>
            </form>

            <LeavePageAlert open={open} setOpen={setOpen} /> 
        </div>
    )
}

export default CreateMaterial