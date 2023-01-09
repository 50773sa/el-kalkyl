import { uuidv4 } from "@firebase/util"
// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'


const CreateMaterialForm = ({ register, qtyList, unitsList, errors }) => {
 

    return (
        <>
            <Grid xs={12} sm={6}>
                <TextField
                    id="fittings"
                    label="Tillbehör"
                    name="fittings"
                    autoComplete="fittings"
                    fullWidth
                    required

                    {...register("fittings", {
                        required: true, 
                        minLength: { value: 1, message: 'Obligatoriskt fält'}
                    })}
                />
                {errors.product === 'required' && <p>Obligatoriskt fält</p>}
            </Grid>

            {/**
             *  Amount
             */}

            <Grid xs={6} sm={3}>
                <TextField
                    select
                    id="qty"
                    name="qty"
                    label="Antal"
                    fullWidth
                    required

                    {...register("qty", {
                        required: true, 
                        minLength: { value: 1, message: 'Obligatoriskt fält'}
                    })}

                >
                    {qtyList.map((val) => (
                        <MenuItem key={val.qty} value={val.qty}>
                            {val.value}
                        </MenuItem>

                    ))}
                </TextField>
                {errors.qty === 'required' && <p>Obligatoriskt fält</p>}
            </Grid>

            {/**
             *  Units
             */}

            <Grid xs={6} sm={3}>
                <TextField
                    id="unit"
                    select
                    name="unit"
                    label="st/m"
                    fullWidth
                    required

                    {...register("unit", {
                        required: true, 
                        minLength: { value: 1, message: 'Obligatoriskt fält'}
                    })}
                >
                    
                    {unitsList.map((option, i) => (
                        <MenuItem key={i.unit} value={option.unit}>
                            {option.value}
                        </MenuItem>
                    ))}

                    {errors.unit === 'required' && <p>Obligatoriskt fält</p>}

                </TextField>
            </Grid>
        </>
    )
}

export default CreateMaterialForm