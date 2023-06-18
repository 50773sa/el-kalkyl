import { useState, useRef } from "react"
import { useForm } from "react-hook-form";
import { db } from '../../firebase'
import { addDoc, collection } from 'firebase/firestore'
import { uuidv4 } from "@firebase/util"
import { toast } from "react-toastify"
// components
import SelectField from '../reusableComponents/forms/SelectField'
import TextInputField from '../reusableComponents/forms/TextInputField'
// hooks
import { useAuthContext } from "../../contexts/AuthContextProvider"
import useStreamCollection from "../../hooks/useStreamCollection"
import useViewStore from '../../store/useViewStore'


// mui
import Button from '@mui/material/Button'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Typography from '@mui/material/Typography'
import SaveOrCancelButtons from "../buttons/SaveOrCancelButtons"
import LeavePageAlert from "../modals/LeavePageAlert"
import CreateMaterialListOfExtraItems from "./CreateMaterialListOfExtraItems";

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
    const { handleSubmit, reset, register, formState: { errors }, unregister } = useForm()
    // const { data: material, loading  } = useStreamCollection('material')

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
    }

    const onSubmit = async (inputData) => {
        setError(null)
        setInputError(false)

        if (extraItems.length === 0) {
            return setInputError(true)
        }

        try {
            await addDoc(collection(db, 'material'), {
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
            reset()

        } catch (err) {
            setError(err)
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

            <Grid container xs={12} >

                <Grid xs={12}>
                    <Typography variant="h6" component="div" textAlign='start' marginBottom='2rem' sx={{ cursor: "default" }}>
                        <strong>Lägg till nytt material</strong> 
                    </Typography>    
                </Grid>
        
                {/**
                 *  Product
                 */}

                <Grid xs={12} lg={6}>
                    <TextInputField
                        required={true}
                        label="Produkt"
                        name="product"
                        autoComplete="product"
                        defaultValue=""
                        helperText={errors ? errors.product && 'Obligatoriskt fält' : ''}
                        register={register("product", {required: true})}
                    />
                </Grid>

                {/**
                 *  Category
                 */}

                <Grid xs={12} lg={6} >
                    <SelectField 
                        required={true}
                        label="Kategori"
                        name="category"
                        defaultValue=""
                        list="category"
                        helperText={errors ? errors.category && 'Obligatoriskt fält' : ''}
                        register={register("category", {required: true})}
                    />  
                </Grid> 

                {/**
                 *  Fittings
                 */}

                <Grid xs={12} sm={6} >
                    <TextInputField
                        required={true}
                        label="Tillbehör"
                        name="fittings"
                        inputRef={fittingsRef}
                        defaultValue=""
                        autoComplete="fittings"
                        helperText={errors ? errors.fittings && 'Obligatoriskt fält' : ''}
    
                        register={register("fittings", {required: true})}
                    />
                </Grid> 

                {/**
                 *  Quantity
                 */}

                <Grid xs={5} sm={2} lg={2} >
                    <SelectField 
                        required={true}
                        label="Antal"
                        name="qty"
                        inputRef={qtyRef}
                        defaultValue=""
                        list="quantity"
                        helperText={errors ? errors.qty && 'Obligatoriskt fält' : ''}
                        register={register("qty", {required: true})}
                    /> 
                </Grid>

                {/**
                 *  Units
                 */}

                <Grid xs={5} sm={2}>
                    <SelectField 
                        required={true}
                        label="st/m"
                        name="unit"
                        inputRef={unitRef}
                        defaultValue=""
                        list="unit"
                        helperText={errors ? errors.unit && 'Obligatoriskt fält' : ''}
                        register={register("unit", {required: true})}
                    /> 
                </Grid>


                {/**
                 *   Add to list- button
                 */}

                <Grid 
                    xs={2} 
                    lg={2}
                    display='flex' 
                    // alignItems="center" 
                    justifyContent="end"        
                >
                    <Button 
                        variant="outlined" 
                        sx={{ width: '8rem', p: 1 }} 
                        onClick={handleObjectInput}
                    >
                        Lägg till
                    </Button>
                    
                </Grid> 


                <Grid xs={12} sx={{ marginTop: '2rem', marginBottom: '6rem' }}>
                    {/* <Typography variant="h6">Tillagt material:</Typography> */}

                    {inputError &&
                        <Typography sx={{ color: "#ff0000" }}>
                            Glöm inte lägga till materialet i listan!
                        </Typography>  
                    }

                    <CreateMaterialListOfExtraItems 
                        extraItems={extraItems} 
                        setExtraItems={setExtraItems}
                    />

                </Grid> 
            
                {/**
                 *  Estimated time
                 */}

                <Grid  xs={12}>
                    <Typography variant="h6" component="div">Tidsetimering</Typography>
                </Grid>


                <Grid xs={6} sm={3}>          
                    <SelectField 
                        required={true}
                        label="Tim"
                        name="hours"
                        defaultValue=""
                        list="hours"
                        helperText={errors ? errors.hours && 'Obligatoriskt fält' : ''}
                        register={register("hours", {required: true})}
                    /> 
                </Grid>


                <Grid xs={6} sm={3}>
                    <SelectField 
                        required={true}
                        label="Min"
                        name="minutes"
                        defaultValue=""
                        list="minutes"
                        helperText={errors ? errors.minutes && 'Obligatoriskt fält' : ''}
                        register={register("minutes", {required: true})}
                    /> 
                </Grid>

                <br/>
        
            </Grid>

            <SaveOrCancelButtons setOpen={setOpen} succes={success} />
            <LeavePageAlert open={open} setOpen={setOpen} /> 


        </form>
    )
}

export default CreateMaterial