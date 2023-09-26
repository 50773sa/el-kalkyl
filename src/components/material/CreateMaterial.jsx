import { useState, useRef, useEffect } from "react"
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
import HoursCreate from "./create/HoursCreate"
import LeavePageAlert from "../modals/LeavePageAlert"
import MinutesCreate from "./create/MinutesCreate"
import ProductCreate from "./create/ProductCreate"
import QuantityCreate from "./create/QuantityCreate"
import SaveOrCancelButtons from "../buttons/SaveOrCancelButtons"
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

const CreateMaterial = ({ materialCategory, setMaterialCategory }) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    const [isErrorCategory, setIsErrorCategory] = useState({ error: false, msg: ''})
    const [inputError, setInputError] = useState(false)
    const [extraItems, setExtraItems] = useState([])
    const [newCategory, setNewCategory] = useState([])
    const fittingsRef = useRef(null)
    const qtyRef = useRef(null)
    const unitRef = useRef(null)
    const categoryRef = useRef(null)
    const { currentUser } = useAuthContext()
    const { handleSubmit, reset, register, formState: { errors, isSubmitting }, unregister } = useForm()
    
    const onSaveCategory = () => {
        setIsLoading(true)

        if (categoryRef.current.value.trim() === "") {
            return (
                setIsErrorCategory({ error: true, msg: t(`modals.errorMsg.required`, 'Required' ) }),
                setIsLoading(false)
            )
        }
        setNewCategory(newCategory => [...newCategory, {value: categoryRef?.current?.value}])
    }


    const handleNewCategory = () => {
        setIsErrorCategory({ error: false, msg:'' })
        let findDuplicates = materialCategory.some(m => m?.value.toLowerCase() === newCategory[0]?.value.toLowerCase())

        if (findDuplicates) {
            return (
                setIsErrorCategory({ error: true, msg: t(`modals.errorMsg.categoryExists`, 'The category already exists...' ) }),
                setNewCategory([]),
                setIsLoading(false)
            )
        } 
        
        setMaterialCategory(materialCategory => [...materialCategory, ...newCategory])

        setTimeout(() => (
            setIsCategoryOpen(false)
        ), 1250)

        setIsLoading(false)   
        setIsErrorCategory({ error: false, msg:'' })
    }


    const handleExtraItemsInput = () => {
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
                product: inputData.product.charAt(0).toUpperCase() + inputData.product.slice(1),
                category: inputData.category,
                quantity: 0,
                extraItems: extraItems,
                estimatedTime: {
                    hours: inputData.hours,
                    minutes: inputData.minutes,
                },
            })
            await addDoc(collection(db, 'categories'), {
                uid: currentUser.uid,
                category: inputData.category.charAt(0).toUpperCase() + inputData.category.slice(1),
            })
            setSuccess(true)
            toast.success('Sparat!')
            reset()
            // location.reload()

        } catch (err) {
            setError(err)
            console.log('error', error)
        }
    }

    useEffect(() => {
        if(isLoading) {
            handleNewCategory()
        } 
        return
    }, [isLoading, materialCategory, isCategoryOpen, newCategory])

    return (
        <CreateWrapper h1={t(`materials.headings.createNewMaterial`, 'Create new material')}>

            {/* {isLoading && <LoadingBackdrop />} */}

            <form 
                onSubmit={handleSubmit(onSubmit)} 
                noValidate 
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            >
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
                            newCategory={newCategory} 
                            setNewCategory={setNewCategory}
                            categoryRef={categoryRef}
                            register={register}
                            handleNewCategory={handleNewCategory}
                            isCategoryOpen={isCategoryOpen}
                            setIsCategoryOpen={setIsCategoryOpen}
                            errors={errors} 
                            materialCategory={materialCategory}
                            onSaveCategory={onSaveCategory}
                            isErrorCategory={isErrorCategory}
                            setIsLoading={setIsLoading}
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
                            onClick={handleExtraItemsInput}
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
                                onClick={handleExtraItemsInput}
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
                                {t(`materials.headings.isErrorCategory`, 'Don\'t forget to add the fitting to the list!')}
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