import { useState, useRef} from "react"
import { useForm } from "react-hook-form"
import { db } from '../firebase'
import { addDoc, collection } from 'firebase/firestore'
import { uuidv4 } from "@firebase/util"
import { useAuthContext } from "../contexts/AuthContextProvider"
import CreateMaterial from "../components/material/CreateMaterial"
import { toast } from "react-toastify"
// mui
import Button from '@mui/material/Button'
import Container from "@mui/system/Container"
import Typography from '@mui/material/Typography'
import LeavePageAlert from "../components/modals/LeavePageAlert"


const CreateMaterialPage = () => {
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
    }

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
        <Container>
            <div className='wrapper' id='addMaterial'>
                <Typography
                    variant="h6" 
                    component="div" 
                    textAlign='start' 
                    marginBottom='2rem'
                >
                <strong>Lägg till nytt material</strong> 
                </Typography>
        

                <form onSubmit={handleSubmit(onSubmit)} noValidate>



                    <CreateMaterial 
                        handleDelete={handleDelete}
                        handleObjectInput={handleObjectInput}
                        errors={errors}
                        register={register}
                        fittingsRef={fittingsRef}
                        qtyRef={qtyRef}
                        unitRef={unitRef}
                        extraItems={extraItems}

                    />

                    {inputError ? <p className="error">Alla fält är obligatoriska!</p> : ''}

                    <div className="buttons">
                        <Button 	
                            type="submit"
                            disabled={extraItems.length === 0 ? true : false}
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

export default CreateMaterialPage