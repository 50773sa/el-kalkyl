import { useState, useRef} from "react"
import { useForm } from "react-hook-form"
import { db } from '../firebase'
import { doc, updateDoc, deleteDoc, collection } from 'firebase/firestore'
import { uuidv4 } from "@firebase/util"
import { useAuthContext } from "../contexts/AuthContextProvider"
import useGetAuthColl from "../hooks/useGetAuthColl"
import EditMaterial from '../components/material/EditMaterial'
import LeavePageAlert from "../components/modals/LeavePageAlert"
import { toast } from "react-toastify"
// mui
import Button from '@mui/material/Button'
import Container from "@mui/system/Container"
import Typography from '@mui/material/Typography'
import LoadingBackdrop from "../components/LoadingBackdrop"


const EditMaterialPage = () => {
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
    const { data: material, isLoading } = useGetAuthColl('material')

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

    const handleDeleteFromFb = (selectedItem) => async () => {
        const ref = doc(db, 'material', selectedItem.id)
		await deleteDoc(ref)   
    }

    const onSubmit = async (inputData) => {
        setError(null)
        setInputError(false)

        if (extraItems.length === 0) {
            return setInputError(true)
        }
        
        try {
            await updateDoc(collection(db, 'material'), {
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
            console.log('err.message', err.message)
        }
    }


    return (
        <Container>
            <div className='wrapper' id='editMaterial'>

                {isLoading && <LoadingBackdrop />}

                <Typography
                    variant="h6" 
                    component="div" 
                    textAlign='start' 
                    marginBottom='2rem'
                >
                    <strong>Redigera material</strong> 
                </Typography>
        

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* Component */}
                    <EditMaterial 
                        material={material} 
                        handleDelete={handleDelete}
                        handleObjectInput={handleObjectInput}
                        handleDeleteFromFb={handleDeleteFromFb}
                        errors={errors}
                        register={register}
                        fittingsRef={fittingsRef}
                        qtyRef={qtyRef}
                        unitRef={unitRef}
                        extraItems={extraItems}
                        inputError={inputError}
                    />

                    {error && <Typography sx={{ color: "#ff0000" }}>{error}</Typography>}

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
        </Container>
    )
}

export default EditMaterialPage