import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form"
// mui
import MenuItem from '@mui/material/MenuItem';
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Grid from "@mui/material/Unstable_Grid2/Grid2";



const AddMaterial = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const onSubmit = data => console.log(data);
    const [numbers, setNumbers] = useState([])
    
    const [fittingsAmount, setFittingsAmount] = React.useState();


    const handleChange = (event) => {
      setFittingsAmount(event.target.value);
    };


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
                    <Grid item xs={12}>
                        <TextField
                            // inputRef={}
                            required
                            fullWidth
                            id="productName"
                            label="Produktnamn"
                            name="productName"
                            autoComplete="productName"
                            helperText=" "
                        />
				    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            // inputRef={}
                            required
                            id="fittings"
                            label="Tillbehör"
                            name="fittings"
                            autoComplete="fittings"
                            fullWidth
                            helperText=" "
                        />
				    </Grid>

                    <Grid item xs={3}>
                        <TextField
                            required
                            id="select"
                            value={Number}
                            label="Antal"
                            onChange={handleChange}
                            fullWidth
                            select
                            helperText=" "
                            >
                                <MenuItem value={10}>10</MenuItem>
                        </TextField>
				    </Grid>

                    <Grid item xs={3}>
                        <TextField
                            required
                            id="select"
                            value={fittingsAmount}
                            label="m/st"
                            onChange={handleChange}
                            fullWidth
                            select
                            helperText=" "

                            >
                                <MenuItem value={'m'}>m</MenuItem>
                                <MenuItem value={'st'}>st</MenuItem>
                        </TextField>
				    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            // inputRef={}
                            required
                            fullWidth
                            id="select"
                            label="Kategori"
                            onChange={handleChange}
                            name="category"
                            autoComplete="category"
                            select
                            helperText=" "
                        >
                            <MenuItem value={''}>Apparater</MenuItem>
                            <MenuItem value={''}>Belysning</MenuItem>
                            <MenuItem value={''}>Tele</MenuItem>
                        </TextField>
				    </Grid>

                    <Grid item xs={12} display='flex' alignItems="center" justifyContent="end" paddingBottom="2rem" paddingTop='2rem'>
                        <AddCircleIcon fontSize="large" onClick={() => {}} />    
				    </Grid>
                
                </Grid>

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
                        onClick={() => console.log('Avbryt')}
                    > Avbryt
                    </Button>
                </div>
     
            </form>
        </div>
    )
}

export default AddMaterial