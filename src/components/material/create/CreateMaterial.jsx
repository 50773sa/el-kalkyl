import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
// firebase
import { db } from '../../../firebase'
import { addDoc, collection } from 'firebase/firestore'
import { uuidv4 } from "@firebase/util"
// components
import ButtonComponent from "../../reusableComponents/buttons/ButtonComponent"
import CreateMaterialListOfExtraItems from "./CreateMaterialListOfExtraItems"
import Header2 from "../../reusableComponents/headers/Header2"
import LeavePageAlert from "../../modals/LeavePageAlert"
import SelectField from '../../reusableComponents/forms/SelectField'
import TextInputField from '../../reusableComponents/forms/TextInputField'
// hooks
import { useAuthContext } from "../../../contexts/AuthContextProvider"
// mui
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Button from '@mui/material/Button'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Typography from '@mui/material/Typography'
import Tooltip from "@mui/material/Tooltip"


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
    const { handleSubmit, reset, register, formState: { errors, isSubmitting }, unregister } = useForm()

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
        <>
            <Header2 h2="Lägg till nytt material" />

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2} pt={2}>
            
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
                            reset={reset}
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
                        alignItems="center" 
                        justifyContent="center"        
                    >
                        <Button 
                            variant="outlined" 
                            sx={{ width: '8rem', p: 1, display: {xs: 'none', md: 'flex'} }} 
                            onClick={handleObjectInput}
                        >
                            Lägg till
                        </Button>

                        {/** show on small devices */}
                        <Tooltip title="Lägg till i listan">
                            <AddCircleIcon
                                sx={{ 
                                    display: {xs: 'flex', md: 'none'},
                                    width: '100%',
                                    fontSize: '40px',
                                    color: '#68C37C'
                                }}
                                onClick={handleObjectInput}
                            />
                        </Tooltip>                        
                    </Grid> 

                    <Grid xs={12}>
                        <Header2 h2="Valda tillbehör" />

                        <CreateMaterialListOfExtraItems 
                            extraItems={extraItems} 
                            setExtraItems={setExtraItems}
                        />

                        {inputError &&
                            <Typography sx={{ color: "#ff0000", ml: 2}}>
                                Glöm inte lägga till materialet i listan!
                            </Typography>  
                        }   

                    </Grid> 
                
                    {/**
                     *  Estimated time
                     */}

                    <Grid  xs={12}>
                        <Header2 h2="Tidsestimering" />
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

                {/* <SaveOrCancelButtons setOpen={setOpen} succes={success} /> */}
                <ButtonComponent 
                    type="submit"
                    variant='contained'
                    size="large"
                    color='green'
                    isFullWidth={false}
                    title='Spara'
                    disabled={isSubmitting ? true : false}
                />
                <LeavePageAlert open={open} setOpen={setOpen} /> 
            </form>
        </>
    )
}

export default CreateMaterial