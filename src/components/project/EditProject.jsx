import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next';
// components 
import CreateWrapper from '../reusableComponents/pageWrappers/CreateWrapper'
import LeavePageAlert from '../modals/LeavePageAlert'
import ListItemProject from './edit/ListItemProject'
import SelectedAndCurrentProducts from './edit/SelectedAndCurrentProducts'
import SaveOrCancelButtons from '../buttons/SaveOrCancelButtons'
import Tabs from './Tabs'
// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import TabContext from '@mui/lab/TabContext'
import TextField from '@mui/material/TextField'

const EditProject = ({ projectId, currentProject, currentUser, material, category }) => {
    const [projectName, setProjectName] = useState(null)
    const [num, setNum] = useState(1)    
    const [value, setValue] = useState('Apparater')
    const [selectedProduct, setSelectedProduct] = useState([])
    const [addToDocProducts, setAddToDocProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const numberRef = useRef()
    const { handleSubmit, formState: { errors, touchedFields }, reset, register } = useForm({mode: 'onTouched'})
    const navigate = useNavigate()
    const { t } = useTranslation()

    // Tabs 
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
            await updateDoc(doc(db, 'projects', projectId), {
                projectName: inputData.projectName,
                projectMaterial: addToDocProducts 
            })

            setSuccess(true)
            toast.success('Sparat!')
            navigate(`/user/${currentUser.uid}/project/${projectId}`)     
            setSelectedProduct([])
            // reset()

        } catch (err) {
            setError(err)
        }
    }

    useEffect(() => {

        setAddToDocProducts(currentProject.projectMaterial)
        
    }, [currentProject, projectName])

    return (
        <CreateWrapper h1={t(`projects.editProject`, 'Edit pro')}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}>

                {/**
                 *  Project name
                 */}

                <Grid xs={12} md={6} sx={{ pr: {xs: 0, md: 2}, mb: 6 }}> 
                    <TextField
                        fullWidth
                        id="projecttName"
                        name="projectName"
                        autoComplete='projectName'
                        onChange={(e) => (setProjectName(e.target.value)) }
                        defaultValue={currentProject.projectName}

                        {...register("projectName", { 
                            required: true, 
                            minLength: { value: 1, message: 'Obligatoriskt fält'}
                        })}
                    >
                        {errors.projectName === 'required' && <p>Obligatoriskt fält</p>} 
                    </TextField>
                </Grid>

                {/**
                 *  Items from db
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
                     *  Update products
                     */}

                    <Grid xs={12} md={6} sx={{ pl: {xs: 0, md: 2}, marginTop: {xs: 0, md: 6} }}>
                        <SelectedAndCurrentProducts 
                            currentProject={currentProject}
                            projectId={projectId}
                            selectedProduct={selectedProduct}
                            setSelectedProduct={setSelectedProduct}
                            numberRef={numberRef}
                            num={num}
                            setNum={setNum}
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

                <SaveOrCancelButtons setOpen={setOpen} />
            </form>

            {/**
             *   Modal
             */}
    
            <LeavePageAlert open={open} setOpen={setOpen}/> 

        </CreateWrapper>
    )
}

export default EditProject