import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { db } from '../../firebase'
import { uuidv4 } from '@firebase/util'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useTranslation } from 'react-i18next'
// components
import CreateWrapper from '../reusableComponents/pageWrappers/CreateWrapper'
import ListItemProject from './edit/ListItemProject'
import LoadingBackdrop from '../LoadingBackdrop'
import LeavePageAlert from '../modals/LeavePageAlert'
import SaveOrCancelButtons from '../buttons/SaveOrCancelButtons'
import SelectedProduct from '../project/create/SelectedProduct'
import Tabs from './Tabs'
import TextInputField from '../reusableComponents/forms/TextInputField'
// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import TabContext from '@mui/lab/TabContext'

const CreateProject = ({ material, currentUser, category}) => {
    const [num, setNum] = useState(1)
    const [value, setValue] = useState('Apparater')
    const [selectedProduct, setSelectedProduct] = useState([])
    const [addToDocProducts, setAddToDocProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const numberRef = useRef()
    const { t } = useTranslation()
    const { handleSubmit, formState: { errors }, reset, register, isSubmitting } = useForm()

    // tabs
    const handleChange = (e, newValue) => {
        e.preventDefault()
        setValue(newValue)
    }

    const onSubmit = async (inputData) => {
        setError(null)

        if (!inputData) {
            return
        }

        try {
            await addDoc(collection(db, 'projects'), {
                uid: currentUser,
                id: uuidv4(),
                completed: false,
                created: serverTimestamp(),
                projectName: inputData.projectName,
                projectMaterial: addToDocProducts
            })
            setSuccess(true)
            toast.success(t(`projects.successMsg`, 'Saved!'))
            setAddToDocProducts(null)
            setSelectedProduct(null)
            reset()

        } catch (err) {
            setError(err)
        }
    }


    return (
        <CreateWrapper h1={t(`projects.createProject`, 'Create project')}>

            {loading && <LoadingBackdrop /> }

            <form onSubmit={handleSubmit(onSubmit)} noValidate onKeyDown={(e) => e.key === "Enter" && e.preventDefault()} >            
                <Grid xs={12} md={6} sx={{ pr: {xs: 0, md: 2}, mb: 6 }}> 
                    <TextInputField
                        required={true}
                        label={t(`projects.placeholder`, 'Project name')}
                        name="projectName"
                        autoComplete="off"
                        defaultValue=""
                        helperText={errors ? errors.projectName && t(`projects.errorMsg.required`, 'Required') : ''}
                        register={register("projectName", {
                            required: true,
                            minLength: { value: 1, message: t(`projects.errorMsg.required`, 'Required')}
                        })}
                    />
                </Grid>

                {/**
                 *  Lists
                 */}

                <Grid container>
                    <Grid xs={12} md={6} sx={{ paddingRight: {xs: 0, md: 2} }}>
                        <TabContext value={value}>
                            
                            <Tabs handleChange={handleChange} category={category} />

                            <ListItemProject 
                                selectedProduct={selectedProduct} 
                                setSelectedProduct={setSelectedProduct}
                                addToDocProducts={addToDocProducts}
                                setAddToDocProducts={setAddToDocProducts}
                                material={material}
                                category={category}
                            />

                        </TabContext>
                    </Grid>

                    {/**
                     *  Selected products
                     */}
                    
                    <Grid xs={12} md={6} sx={{ pl: {xs: 0, md: 2}, marginTop: {xs: 0, md: 6} }}>
                        <SelectedProduct
                            selectedProduct={selectedProduct}
                            setSelectedProduct={setSelectedProduct}
                            numberRef={numberRef}
                            num={num}
                            setNum={setNum}
                            error={error}
                            setError={setError}
                            addToDocProducts={addToDocProducts}
                            setAddToDocProducts={setAddToDocProducts}
                            setLoading={setLoading}
                        />
                    </Grid>
                </Grid>

                {/**
                 *  Buttons
                 */}

                <SaveOrCancelButtons 
                    setOpen={setOpen} 
                    success={success} 
                    isSubmitting={isSubmitting} 
                />

            </form>

            <LeavePageAlert open={open} setOpen={setOpen}/>    

        </CreateWrapper>
    )
}

export default CreateProject