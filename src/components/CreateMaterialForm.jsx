import { uuidv4 } from "@firebase/util"
// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'


const CreateMaterialForm = ({ register, amountList, unitsList, errors }) => {
 

    return (
        <>
            <Grid item xs={12} sm={6}>
                <TextField
                    id="item"
                    label="Tillbehör"
                    name="item"
                    autoComplete="item"
                    fullWidth
                    required

                    {...register("item", {
                        required: true, 
                        minLength: { value: 1, message: 'Obligatoriskt fält'}
                    })}
                />
                {errors.product === 'required' && <p>Obligatoriskt fält</p>}
            </Grid>

            {/**
             *  Amount
             */}

            <Grid item xs={6} sm={3}>
                <TextField
                    select
                    id="amount"
                    name="amount"
                    label="Antal"
                    fullWidth
                    required

                    {...register("amount", {
                        required: true, 
                        minLength: { value: 1, message: 'Obligatoriskt fält'}
                    })}

                >
                    {amountList.map((val) => (
                        <MenuItem key={val.amount} value={val.amount}>
                            {val.value}
                        </MenuItem>

                    ))}
                </TextField>
                {errors.amount === 'required' && <p>Obligatoriskt fält</p>}
            </Grid>

            {/**
             *  Units
             */}

            <Grid item xs={6} sm={3}>
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