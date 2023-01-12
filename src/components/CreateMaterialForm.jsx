import { uuidv4 } from "@firebase/util"
// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const CreateMaterialForm = ({ register, qtyList, unitsList, errors, form, fittingsRef, qtyRef, unitRef, handleDelete }) => {
 
    return (

        <>
            {form && form.map((i) => (
                <>
                    {/**
                     *  Fittings
                     */}
                <Grid container xs={12} key={i}>
 

                    <Grid xs={12} sm={6} key={i.id}>
                        <TextField
                            id="fittings"
                            label="Tillbehör"
                            name="fittings"
                            autoComplete="fittings"
                            fullWidth
                            required
                            inputRef={fittingsRef}
                            defaultValue=""


                            {...register("fittings", {
                                required: true, 
                                minLength: { value: 1, message: 'Obligatoriskt fält'}
                            })}
                        />
                        {errors.product === 'required' && <p>Obligatoriskt fält</p>}
                    </Grid>
        
                    {/**
                    *  Quantity
                    */}
        
                    <Grid xs={6} sm={3} key={i.id}>
                        <TextField
                            select
                            id="qty"
                            name="qty"
                            label="Antal"
                            fullWidth
                            required
                            inputRef={qtyRef}
        
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
        
                    <Grid xs={5} sm={2} key={i.id}>
                        <TextField
                            id="unit"
                            select
                            name="unit"
                            label="st/m"
                            fullWidth
                            required
                            inputRef={unitRef}
                            defaultValue=""
        
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

                    <Grid xs={1} sm={1}color="red" display="flex" alignItems="center" justifyContent="center">
                        <RemoveCircleOutlineIcon onClick={handleDelete(i)}/>
                    </Grid>
                </Grid>
                </>

            ))}
          
        </>
    )
}

export default CreateMaterialForm