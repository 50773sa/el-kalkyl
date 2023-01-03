import { useController, useForm } from "react-hook-form";

// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'


const AddMaterialsForm = ({ register, amountList, unitsList }) => {

    return (
        <>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="item"
                    label="Tillbehör"
                    name="item"
                    autoComplete="item"
                    fullWidth

                    {...register("item", {
                        minLength: { value: 1, message: 'Obligatoriskt fält'}
                    })}
                />
            </Grid>

            {/**
             *  Amount
             */}

            <Grid item xs={6} sm={3}>
                <TextField
                    select
                    required
                    id="amount"
                    label="Antal"
                    fullWidth

                    {...register("amount", {
                        minLength: { value: 1, message: 'Obligatoriskt fält'}
                    })}

                >
                    {amountList.map((val) => (
                        <MenuItem key={val.amount} value={val.amount}>
                            {val.value}
                        </MenuItem>

                    ))}
                </TextField>
            </Grid>

            {/**
             *  Units
             */}

            <Grid item xs={6} sm={3}>
                <TextField
                    select
                    required
                    label="st/m"
                    fullWidth

                    {...register("unit", {
                        minLength: { value: 1, message: 'Obligatoriskt fält'}
                    })}
                >
                    
                    {unitsList.map((option) => (
                        <MenuItem key={option.unit} value={option.unit}>
                            {option.value}
                        </MenuItem>
                    ))}

                    
                </TextField>
            </Grid>

        </>
    )
}

export default AddMaterialsForm