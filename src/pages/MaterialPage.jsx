import { useState, useRef, useEffect} from "react"
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'
import { uuidv4 } from "@firebase/util"
import { useAuthContext } from "../contexts/AuthContextProvider"
import CreateMaterial from "../components/material/CreateMaterial"
import LeavePageAlert from "../components/modals/LeavePageAlert"
import { toast } from "react-toastify"
// mui
import Button from '@mui/material/Button'
import Container from "@mui/system/Container"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Typography from '@mui/material/Typography'
import TabsLarge from "../components/buttons/TabsLarge"
import AllMaterial from "../components/material/AllMaterial";
import useStreamCollection from "../hooks/useStreamCollection";
import LoadingBackdrop from "../components/LoadingBackdrop";


const MaterialPage = () => {
    const [isActive, setIsActive] = useState(true)
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
    const { data: material, loading  } = useStreamCollection('material')

    console.log('material', material)

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

    const handleDelete = (selectedItem) => () => {
        setExtraItems((items) => items.filter((item) => item.id !== selectedItem.id))
    }

    const onSubmit = async (inputData) => {
        setError(null)
        setInputError(false)

        if (extraItems.length === 0) {
            return setInputError(true)
        }

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
            reset()

        } catch (err) {
            setError(err)
        }
    }


    return (
        <Container>
            <div className='wrapper'>

                {loading && <LoadingBackdrop />}
                

           
                <Grid container spacing={2}>
                    <TabsLarge 
                        title1="Material"
                        title2="Nytt material"
                        isActive={isActive}
                        setIsActive={setIsActive}
                    />

                    {!loading && material && (
                        <Grid xs={12} sx={{ height: "80%", pb: 6, backgroundColor: "#fbfbfb", borderRadius: "0 0 10px 10px"}}>
                            {!isActive ? (
                                <>
                                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                        {/* Component */}
                                        <CreateMaterial 
                                            handleDelete={handleDelete}
                                            handleObjectInput={handleObjectInput}
                                            errors={errors}
                                            register={register}
                                            fittingsRef={fittingsRef}
                                            qtyRef={qtyRef}
                                            unitRef={unitRef}
                                            extraItems={extraItems}
                                            inputError={inputError}
                                            setInputError={setInputError}
                                        />
            
                                        {error && <Typography sx={{ color: "#ff0000" }}>{error}</Typography>}
            
                                        <Grid xs={12} display="flex" justifyContent="center" flexDirection="column" alignItems="start" className="buttons">
                                            <Grid xs={12} lg={3}>
                                                <Button 	
                                                    type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    sx={{ mt: 3, mb: 2, p: 1 }}
                                                > Spara
                                                </Button>
                                                <Button
                                                    fullWidth
                                                    onClick={() => {!success ? setOpen(true) : ''}}
                                                > Avbryt
                                                </Button>
                                            </Grid>
                                        </Grid>
            
                                    </form>
                                </>
                                
                            ):  material && <AllMaterial material={material} />}
                        </Grid>
                    )}
                    

                    <LeavePageAlert open={open} setOpen={setOpen} /> 
                </Grid>
 
            </div>
        </Container>
    )
}

export default MaterialPage