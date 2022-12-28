import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form"
import Alert from "./Alert"
// mui
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import AddMaterialsForm from "./AddMaterialsForm";


const AddMaterial = () => {
    const [open, setOpen] = useState(false)
    const [form, setForm] = useState([<AddMaterialsForm/>])
    const [fittingsAmount, setFittingsAmount] = useState()
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const onSubmit = data => console.log(data);
    
    const handleChange = (event) => {
         setFittingsAmount(event.target.value);
    }

    const addForm = () => {
        setForm([...form, form])
    }

    return (
        <div className='wrapper addMaterial' id='addMaterial'>

            <Typography
                variant="h6" 
                component="div" 
                textAlign='start' 
                marginBottom='2rem'
            >
               <strong>Lägg till nytt material</strong> 
            </Typography>
    

            <form onSubmit={handleSubmit(onSubmit)  }>
                <Grid container spacing={2}>

                    {form && form.map((i) => (
                        <AddMaterialsForm key={i} handleChange={handleChange} setFittingsAmount={setFittingsAmount}/> 
                    ))}                    

                    <Grid item xs={12} display='flex' alignItems="center" justifyContent="end" paddingBottom="2rem" paddingTop='2rem'>
                        <AddCircleIcon fontSize="large" onClick={addForm} />    
                    </Grid>
                    
                </Grid>
            </form>

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
                        onClick={() => {setOpen( open ? false : true)}}
                    > Avbryt
                    </Button>
                </div>

            <Alert open={open} setOpen={setOpen}/> 

        </div>
    )
}

export default AddMaterial