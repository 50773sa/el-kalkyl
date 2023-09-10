import { useState, useRef } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
// firebase
import { db } from '../../../src/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { uuidv4 } from "@firebase/util"
// components
import CategoryCreate from "./create/CategoryCreate"
import CreateWrapper from "../reusableComponents/pageWrappers/CreateWrapper"
import CreateMaterialListOfExtraItems from "./create/CreateMaterialListOfExtraItems"
import FittingsCreate from "./create/FittingsCreate"
import Heading2 from "../reusableComponents/headings/Heading2"
import LeavePageAlert from "../modals/LeavePageAlert"
import ProductCreate from "./create/ProductCreate"
import QuantityCreate from "./create/QuantityCreate"
import SaveOrCancelButtons from "../buttons/SaveOrCancelButtons"
import SelectField from '../reusableComponents/forms/SelectField'
import UnitCreate from "./create/UnitCreate"
// hooks
import { useAuthContext } from "../../contexts/AuthContextProvider"
// mui
import { useTheme } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Button from '@mui/material/Button'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Typography from '@mui/material/Typography'
import Tooltip from "@mui/material/Tooltip"
import HoursCreate from "./create/HoursCreate"
import MinutesCreate from "./create/MinutesCreate"


const CreateMaterial = () => {
    const theme = useTheme()
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
    const { t } = useTranslation()

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
                category: inputData.category,
                quantity: 0,
                extraItems: extraItems,
                estimatedTime: {
                    hours: inputData.hours,
                    minutes: inputData.minutes,
                },
            })
            setSuccess(true)
            toast.success('Sparat!')
            reset()

        } catch (err) {
            setError(err)
        }
    }


    return (
        <CreateWrapper h1={t(`materials.headings.createNewMaterial`, 'Create new material')}>

            <form onSubmit={handleSubmit(onSubmit)} noValidate onKeyDown={(e) => e.key === "Enter" && e.preventDefault()} >
                <Grid container spacing={2} pt={2}>
            
                    {/**
                     *  Product
                     */}

                    <Grid xs={12} lg={6}>
                        <ProductCreate 
                            errors={errors} 
                            register={register} 
                        />
                    </Grid>

                    {/**
                     *  Category
                     */}

                    <Grid xs={12} lg={6} >
                        <CategoryCreate 
                            errors={error} 
                            register={register} 
                        />
                    </Grid> 

                    {/**
                     *  Fittings
                     */}

                    <Grid xs={12} sm={6} >
                        <FittingsCreate 
                            fittingsRef={fittingsRef} 
                            errors={errors} 
                            register={register} 
                        />
                    </Grid>  

                    {/**
                     *  Quantity
                     */}

                    <Grid xs={5} sm={2} lg={2} >
                        <QuantityCreate
                            qtyRef={qtyRef} 
                            reset={reset}
                            errors={errors} 
                            register={register} 
                        />
                    </Grid>

                    {/**
                     *  Units
                     */}

                    <Grid xs={5} sm={2}>
                        <UnitCreate
                            unitRef={unitRef}
                            errors={errors} 
                            register={register} 
                        />
                    </Grid>

                    {/**
                     *   Add to list- button
                     */}

                    <Grid xs={2} lg={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Button 
                            variant="outlined" 
                            sx={{ width: '8rem', p: 1, display: {xs: 'none', md: 'flex'} }} 
                            onClick={handleObjectInput}
                        >
                            {t(`materials.headings.addButton`, 'Add')}
                        </Button>

                        {/** show on small devices */}
                        <Tooltip title={t(`materials.headings.addTooltip`, 'Create new material')}>
                            <AddCircleIcon
                                sx={{ 
                                    display: {xs: 'flex', md: 'none'},
                                    width: '100%',
                                    fontSize: '40px',
                                    color: theme.palette.color.green.main, '&:hover': { color: theme.palette.color.green.hover}
                                }}
                                onClick={handleObjectInput}
                            />
                        </Tooltip>                        
                    </Grid> 

                    {/**
                     *   List
                     */}

                    <Grid xs={12}>
                        <Heading2 h2={t(`materials.headings.fittings`, 'Fittings')}/>

                        <CreateMaterialListOfExtraItems 
                            extraItems={extraItems} 
                            setExtraItems={setExtraItems}
                        />

                        {inputError &&
                            <Typography sx={{ color: "#ff0000", ml: 2 }}>
                                {t(`materials.headings.errorMsg`, 'Don\'t forget to add the fitting to the list!')}
                            </Typography>  
                        }   

                    </Grid> 
                
                    {/**
                     *  Estimated time
                     */}

                    <Grid xs={12}>
                        <Heading2 h2={t(`materials.headings.installationTime`, 'Installation time')} />
                    </Grid>

                    <Grid xs={6} sm={3}>          
                        <HoursCreate 
                            errors={errors} 
                            register={register} 
                        />
                    </Grid>


                    <Grid xs={6} sm={3}>
                        <MinutesCreate
                            errors={errors} 
                            register={register} 
                        />
                    </Grid>

                    <br/>
                </Grid>

                <SaveOrCancelButtons
                    setOpen={setOpen} 
                    succes={success} 
                    isSubmitting={isSubmitting}
                />
          
                <LeavePageAlert open={open} setOpen={setOpen} /> 
            </form>
        </CreateWrapper>
    )
}

export default CreateMaterial