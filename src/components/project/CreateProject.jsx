import { useRef, useState } from 'react'
import { db } from '../../firebase'
import { uuidv4 } from '@firebase/util'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import { useForm } from 'react-hook-form';
import LoadingBackdrop from '../LoadingBackdrop'
import LeavePageAlert from '../modals/LeavePageAlert'
import useStreamCollection from '../../hooks/useStreamCollection'
import { toast } from 'react-toastify'
// mui
import Button from '@mui/material/Button'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { InputAdornment } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import { TabList } from '@mui/lab'
import TabPanel from '@mui/lab/TabPanel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'



const CreateProject = () => {
    const [num, setNum] = useState([0])
    
    const [value, setValue] = useState('Apparater')
    const [selectedProduct, setSelectedProduct] = useState([])
    const [addToDocProducts, setAddToDocProducts] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const numberRef = useRef()
    const { currentUser } = useAuthContext()
    const { data: material, loading: isStreaming} = useStreamCollection('material', 'Apparater')
    const { handleSubmit, formState: { errors }, reset, register } = useForm()


    const handleChange = (e, newValue) => {
        e.preventDefault()
        setValue(newValue);
    }

    // Add to list
    const handleAdd = (item) => () => {
        setLoading(true)

        if (selectedProduct.includes(item)) {
            return setLoading(false), 
                console.log('Item already exists')
        }
        setSelectedProduct(selectedProduct => [...selectedProduct, item])
        setLoading(false)
    }

    const handleDelete = (selectedItem) => () => {
        setSelectedProduct((items) => items.filter((item) => item.id !== selectedItem.id))
    }

    // handle selected items
    const handleClick = (item) => (e) => {
        e.preventDefault()
        setError(null)

        if (num === 0) {
            return setLoading(false), console.log('No products')
        }

        setNum(Number(numberRef.current.value))
        item.quantity = num

        if (addToDocProducts.includes(item)) {
            setLoading(false)
            return 
        }

        try {
            setLoading(true)
            setAddToDocProducts(selectedProduct => [...selectedProduct, item])

            setLoading(false)

        } catch(err) {
            setError(err)
            setLoading(false)

        }
    }


    const onSubmit = async (inputData) => {
        setError(null)

        if (!inputData) {
            return
        }

        try {
            await addDoc(collection(db, 'projects'), {
                uid: currentUser.uid,
                id: uuidv4(),
                completed: false,
                created: serverTimestamp(),
                projectName: inputData.projectName,
                projectMaterial: addToDocProducts
            })
            setSuccess(true)
            toast.success('Sparat!')
            setAddToDocProducts(null)
            setSelectedProduct(null)
            reset()

        } catch (err) {
            setError(err)
        }
    }


    return (
        <div className='wrapper createProject' id='createProjectWrapper'>

            {loading ? <LoadingBackdrop /> : ''}

            <Typography variant="h6" component="div" textAlign='start' marginBottom='2rem'>
                <strong>L??gg till nytt projekt</strong> 
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid container spacing={2}>
                    <Grid xs={12} style={{ marginBottom: '3rem'}} >
                        <TextField
                            required
                            fullWidth
                            id="projecttName"
                            label="Projekt"
                            name="projectName"
                            autoComplete="off"
                            defaultValue=""

                            {...register("projectName", { 
                                required: true, 
                                minLength: { value: 1, message: 'Obligatoriskt f??lt'}
                            })}
                        >
                        {errors.projectName === 'required' && <p>Obligatoriskt f??lt</p>}
                        </TextField>

                    </Grid>

                    {/**
                     *  Lists
                     */}

                    <Grid xs={12}>
                        <TabContext value={value}>
                            <Grid xs={12}>
                                <TabList onChange={handleChange} aria-label="tab list" style={{ marginBottom: '1rem' }}>
                                    <Tab className='tab' label="Apparater" value="Apparater" />
                                    <Tab className='tab' label="Belysning" value="Belysning" />
                                    <Tab className='tab' label="Tele" value="Tele" />
                                </TabList>
                            </Grid>

                            <Grid xs={12} style={{ border: '1px solid #cacaca'}}>
                                <TabPanel value="Apparater" style={{ height: '200px'}}>
                                    <List>
                                        {!isStreaming ? material?.filter(list => list.category === "Apparater").map((item, i) => (
                                            <ListItem 
                                                key={i} 
                                                value={"Apparater"}
                                                name="project"
                                                onClick={handleAdd(item)}
                                                disableGutters
                                            > 
                                                {item.product}
                                            </ListItem>
                                        )): ''}
                                    </List>
                                </TabPanel> 

                                <TabPanel value="Belysning" style={{ height: '200px'}}>
                                    <List>
                                        {!isStreaming ? material?.filter(list => list.category === "Belysning").map((item, i) => (
                                            <ListItem 
                                                key={i} 
                                                value={"Belysning"}
                                                onClick={handleAdd(item)}
                                                disableGutters
                                            > 
                                                {item.product}
                                            </ListItem>
                                        )): ''}
                                    </List>
                                </TabPanel>

                            
                                <TabPanel value="Tele" style={{ height: '200px'}}>
                                    <List>
                                        {!isStreaming ? material?.filter(list => list.category === "Tele").map((item, i) => (
                                            <ListItem 
                                                key={i} 
                                                value={"Tele"}
                                                onClick={handleAdd(item)}
                                                disableGutters
                                            > 
                                                {item.product}
                                            </ListItem>
                                        )): ''}
                                    </List>
                                </TabPanel>
                            </Grid>
                        </TabContext>
                    </Grid>
                </Grid>

                {/**
                 *  Selected products
                 */}

                <Grid container spacing={2} style={{ marginBottom: "6rem" }}>
                    {selectedProduct?.map((item, i) => (
                        <>
                            <Grid xs={6} display="flex" justifyContent="center" alignItems="center">
                                <ListItem value={item} key={i}> 
                                    {item.product}, {item.quantity}
                                </ListItem>
                            </Grid>
                        
                            <Grid xs={4} display="flex" justifyContent="end" alignItems="center" >

                                <TextField
                                    key={i}
                                    type="number"
                                    variant="outlined"
                                    inputRef={numberRef}
                                    onChange={(e) => (setNum(Number(e.target.value)))}
                                    value={num.i}
                                    onClick={handleClick(item)}
                                    size='small'
                                    InputProps={{
                                        inputProps: {min: 0, max: 100 },
                                        inputMode: 'numeric', pattern: '[0-9]*',
                                        endAdornment: <InputAdornment position="end">st</InputAdornment>,
                                    }}
                                />

                            </Grid>

                            <Grid xs={2} display="flex" justifyContent="end" alignItems="center" color="red">
                                <DeleteForeverIcon  onClick={handleDelete(item)} />
                            </Grid>
                        </>
                    
                    ))}
                </Grid>

                {/**
                 *  Buttons
                 */}

                <Grid item xs={12} className="buttonsWrap">
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
                </Grid>

            </form>

            <LeavePageAlert open={open} setOpen={setOpen}/>        

        </div>
    )
}

export default CreateProject