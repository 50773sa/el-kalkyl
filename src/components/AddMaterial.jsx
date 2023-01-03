import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form"
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import useStreamDoc from '../hooks/useStreamDoc';
import { useAuthContext } from "../contexts/AuthContextProvider";
import DialogAlert from "./DialogAlert"
import AddMaterialsForm from "./AddMaterialsForm";


// mui
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

// dropdowns
const unitsList = [
    {unit: 'st', value: 'st'},
    {unit: 'm', value: 'm'}
]
const amountList = [
    {amount: 1, value: 1},
    {amount: 2, value: 2},
    {amount: 3, value: 3},
    {amount: 4, value: 4},
]
const hoursList = [
    {hour: 1, value: 1},
    {hour: 2, value: 2},
    {hour: 3, value: 2}, 
]
const minutesList = [
    {minutes: 0.25, value: 15},
    {minutes: 0.5, value: 30},
    {minutes: 0.75, value: 45}, 
]


const AddMaterial = () => {
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState([<AddMaterialsForm/>])
    const { currentUser } = useAuthContext()
    const { handleSubmit, formState: { errors }, reset, register } = useForm()

    const addForm = () => {
        setForm([...form, form])
    }

    const onSubmit = async (inputData) => {
        console.log('inputData', inputData)

        try {
            await addDoc(collection(db, 'material'), {
                id: inputData.product,
                uid: currentUser.uid,
                product: inputData.product,
                items: {
                    item: inputData.item,
                    amount: inputData.amount,
                    unit: inputData.unit,
                },
                estimatedTime: {
                    hours: inputData.hours,
                    minutes: inputData.minutes,
                },
                category: inputData.category,
            })
            // reset()

        } catch (err) {
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
                            required
                            id="product"
                            label="Produkt"
                            name="product"
                            autoComplete="product"
                            fullWidth

                            {...register("product", {
                                minLength: { value: 2, message: 'Obligatoriskt fält'}
                            })}
                        />
                        {errors.product && <div className="invalid">{errors.product.message}</div>}
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
                            {amountList.map((val) => (
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
                        <AddMaterialsForm key={i} register={register} amountList={amountList} unitsList={unitsList}/> 
                    ))} 

                    <Grid item xs={12} display='flex' alignItems="center" justifyContent="end" paddingBottom="2rem" paddingTop='2rem'>
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
                            required
                            label="Tim"
                            fullWidth

                            {...register("hours", {
                                minLength: { value: 1, message: 'Obligatoriskt fält'}
                            })}
                        >
                            {hoursList.map((option) => (
                                <MenuItem key={option.hour} value={option.hour}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                     </Grid>


                     <Grid item xs={6} sm={3}>
                        <TextField
                            select
                            required
                            label="Min"
                            fullWidth

                            {...register("minutes", {
                                minLength: { value: 1, message: 'Obligatoriskt fält'}
                            })}
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

                    <Grid item xs={12} >
                        <TextField
                            select
                            required
                            label="Kategori"
                            fullWidth
                            style={{ marginBottom: '6rem'}}

                            {...register("category", {
                                minLength: { value: 1, message: 'Obligatoriskt fält'}
                            })}
                        >
                            <MenuItem value={1}>Apparater</MenuItem>
                            <MenuItem value={2}>Belysning</MenuItem>
                            <MenuItem value={3}>Tele</MenuItem>
                        </TextField>
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
                        onClick={() => {setOpen( open ? false : true)}}
                    > Avbryt
                    </Button>
                </div>
            </form>


            <DialogAlert open={open} setOpen={setOpen}/> 

        </div>
    )
}

export default AddMaterial