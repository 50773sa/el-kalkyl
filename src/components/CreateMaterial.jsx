import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form";
import { useAuthContext } from "../contexts/AuthContextProvider";
import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'
import CreateMaterialsForm from "./CreateMaterialForm"
import LeavePageAlert from "./modals/LeavePageAlert"
import { uuidv4 } from "@firebase/util"



// mui
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import SuccessAlert from "./modals/SuccessAlert"

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
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [form, setForm] = useState([<CreateMaterialsForm/>])
    const [qtyList, _setQtyList] = useState(quantity)
    const [hoursList, _setHoursList] = useState(hours)

    const { currentUser } = useAuthContext()
    const { handleSubmit, formState: { errors }, reset, register, control } = useForm()


    const addForm = () => {
       setForm([...form, form])
    }

    const onSubmit = async (inputData) => {
        console.log('inputData', inputData)
        setError(null)

        try {
            await addDoc(collection(db, 'material'), {
                id: uuidv4(),
                uid: currentUser.uid,
                product: inputData.product,
                quantity: null,
                extraItems: [{
                        fittings: inputData.fittings,
                        qty: inputData.qty,
                        unit: inputData.unit,
                }],
                estimatedTime: {
                    hours: inputData.hours,
                    minutes: inputData.minutes,
                },
                category: inputData.category,
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
                    <Grid xs={12}>
                        <TextField
                            id="product"
                            label="Produkt"
                            name="product"
                            autoComplete="product"
                            fullWidth
                            required

                            {...register("product", { 
                                required: true, 
                                minLength: { value: 1, message: 'Obligatoriskt fält'}
                            })}
                        />
                        {errors.product === 'required' && <p>Obligatoriskt fält</p>}
                    </Grid>

                    {/* <Grid fittings xs={12} sm={6}>
                        <TextField
                            required
                            id="fittings"
                            label="Tillbehör"
                            name="fittings"
                            autoComplete="fittings"
                            fullWidth

                            {...register("fittings", {
                                minLength: { value: 1, message: 'Obligatoriskt fält'}
                            })}
                        />
                    </Grid> */}

                    {/**
                     *  Amount
                     */}

                    {/* <Grid fittings xs={6} sm={3}>
                        <TextField
                            select
                            required
                            id="qty"
                            label="Antal"
                            fullWidth

                            {...register("qty", {
                                minLength: { value: 1, message: 'Obligatoriskt fält'}
                            })}

                        >
                            {quantity.map((val) => (
                                <MenuItem key={val.qty} value={val.qty}>
                                    {val.value}
                                </MenuItem>

                            ))}
                        </TextField>
                    </Grid> */}

                    {/**
                     *  Units
                     */}

                    {/* <Grid fittings xs={6} sm={3}>
                        <TextField
                            select
                            required
                            label="st/m"
                            fullWidth

                            {...register("unit", {
                                minLength: { value: 1, message: 'Obligatoriskt fält'}
                            })}
                        >
                               

                            {unitsList.map((option) => (
                                <MenuItem key={option.unit} value={option.unit}>
                                    {option.value}
                                </MenuItem>
                            ))}

                         
                        </TextField>
                     </Grid> */}

                    {/**
                      * Add another field
                      */}

                    {form && form.map((i) => (
                         <CreateMaterialsForm 
                            key={i}
                            register={register} 
                            unitsList={unitsList} 
                            qtyList={qtyList}
                            errors={errors}
                        /> 

                    ))}
              

                    <Grid 
                        xs={12} 
                        display='flex' 
                        alignItems="center" 
                        justifyContent="end" 
                        paddingBottom="2rem" 
                        paddingTop='2rem'
                    >
                        <AddCircleIcon fontSize="large" onClick={addForm} />    
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

                            {...register("hours", {
                                required: true, 
                                minLength: { value: 1, message: 'Obligatoriskt fält'}
                            })}
                        >
                            {hoursList.map((option) => (
                                <MenuItem key={option.hours} value={option.hours}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                        {errors.hours === 'required' && <p>Obligatoriskt fält</p>}
                     </Grid>


                     <Grid xs={6} sm={3}>
                        <TextField
                            select
                            label="Min"
                            fullWidth
                            required

                            {...register("minutes", {
                                required: true, 
                                minLength: { value: 1, message: 'Obligatoriskt fält'}
                            })}
                        >
                            {minutesList.map((option) => (
                                <MenuItem key={option.minutes} value={option.minutes}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                        {errors.minutes === 'required' && <p>Obligatoriskt fält</p>}
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

                            {...register("category", {
                                required: true, 
                                minLength: { value: 1, message: 'Obligatoriskt fält'}
                            })}
                        >
                            <MenuItem value={'Apparater'}>Apparater</MenuItem>
                            <MenuItem value={'Belysning'}>Belysning</MenuItem>
                            <MenuItem value={'Tele'}>Tele</MenuItem>
                        </TextField>
                        {errors.category === 'required' && <p>Obligatoriskt fält</p>}
                    </Grid>        
                </Grid>

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
                        onClick={() => {setOpen(true)}}
                    > Avbryt
                    </Button>
                </div>
            </form>

            {open ? <LeavePageAlert open={open} setOpen={setOpen} /> : ''}

            {success && open ? <SuccessAlert open={open} setOpen={setOpen} /> : ''}

        </div>
    )
}

export default CreateMaterial