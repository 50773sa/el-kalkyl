import { addDoc, collection } from 'firebase/firestore';
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useAuthContext } from "../contexts/AuthContextProvider";
import { db } from '../firebase';
import AddMaterialsForm from "./AddMaterialsForm";
import DialogAlert from "./DialogAlert";


// mui
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import SuccessAlert from "./SuccessAlert";

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
const amounts = [...new Array(101)].map((each, index) => ({ amount: index, value: index }))
const hours = [...new Array(12)].map((each, index) => ({ hours: index, value: index }))


const AddMaterial = () => {
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')
    const [form, setForm] = useState([<AddMaterialsForm/>])
    const [amountList, _setAmountList] = useState(amounts)
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
                id: inputData.product,
                uid: currentUser.uid,
                product: inputData.product,
                extraItems: [{
                        item: inputData.item,
                        amount: inputData.amount,
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
            setSuccessMsg('Sparat!')
            console.log('successMsg', successMsg)
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
                    <Grid item xs={12}>
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

                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="item"
                            label="Tillbehör"
                            name="item"
                            autoComplete="item"
                            fullWidth

                            {...register("item", {
                                minLength: { value: 1, message: 'Obligatoriskt fält'}
                            })}
                        />
                    </Grid>

                    {/**
                     *  Amount
                     */}

                    <Grid item xs={6} sm={3}>
                        <TextField
                            select
                            required
                            id="amount"
                            label="Antal"
                            fullWidth

                            {...register("amount", {
                                minLength: { value: 1, message: 'Obligatoriskt fält'}
                            })}

                        >
                            {amounts.map((val) => (
                                <MenuItem key={val.amount} value={val.amount}>
                                    {val.value}
                                </MenuItem>

                            ))}
                        </TextField>
                    </Grid>

                    {/**
                     *  Units
                     */}

                    <Grid item xs={6} sm={3}>
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
                     </Grid>

                    {/**
                      * Add another field
                      */}

                    {form && form.map((i) => (
                         <AddMaterialsForm 
                            key={i}
                            register={register} 
                            unitsList={unitsList} 
                            amountList={amountList}
                            errors={errors}
                        /> 

                    ))}
              

                    <Grid 
                        item xs={12} 
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

                     <Grid item xs={12}>
                        <Typography variant="h6" component="div">Tidsetimering</Typography>
                    </Grid>


                     <Grid item xs={6} sm={3}>
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


                     <Grid item xs={6} sm={3}>
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

                    <Grid item xs={12} >
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
                        onClick={() => {setOpenModal(true)}}
                    > Avbryt
                    </Button>
                </div>
            </form>

            {/* {openModal ? <DialogAlert openModal={openModal} setOpenModal={setOpenModal} /> : ''} */}

            {open ? <SuccessAlert open={open} setOpen={setOpen} /> : ''}

        </div>
    )
}

export default AddMaterial