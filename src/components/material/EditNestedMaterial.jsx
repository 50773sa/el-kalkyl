import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { db } from '../../firebase'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import { Button } from "@mui/material";

// dropdowns
const unitsList = [
    {unit: 'st', value: 'st'},
    {unit: 'm', value: 'm'}
]

const quantity = [...new Array(101)].map((each, index) => ({ qty: index, value: index }))


const EditNestedMaterial = ({ item, items, fittingsRef, errors, unitRef, qtyRef, onUpdateFittings, register, itemIndex }) => {
    const [error, setError] = useState(false)

    // const { handleSubmit, reset, register, setValue, formState: { errors }, unregister } = useForm()



    return (
        <TableRow>
            <TableCell sx={{ cursor: 'pointer', border: 'none' }}>
                <Grid container xs={12}>

                    {/**
                     *  Fittings
                     */}

                    <Grid xs={6} py={0}>
                        <TextField
                            size="small"
                            id="fittings"
                            defaultValue={item.fittings}
                            name={`extraItems[${itemIndex}].fittings`}
                            autoComplete="fittings"
                            fullWidth
                            // helperText={errors ? errors.fittings && 'Obligatoriskt fält' : ''}

                            // keep ...register. Otherwise the helper text will not be visible.
                            {...register(`extraItems[${itemIndex}].fittings`)}
                            // {...register("fittings", {required: true})}
                        />  

                
                    
                    </Grid>

                    {/**
                     *  Quantity
                     */}

                    <Grid xs={3} py={0}>
                        <TextField
                            select
                            // required
                            size="small"
                            id="quantity"
                            label="Antal"
                            name={`extraItems[${itemIndex}].quantity`}
                            fullWidth
                            defaultValue={item.quantity}
                            helperText={errors ? errors.qty && 'Obligatoriskt fält' : ''}

                            {...register(`extraItems[${itemIndex}].quantity`)}

                        >
                            {quantity.map((val) => (
                                <MenuItem key={val.qty} value={val.qty}>
                                    {val.value}
                                </MenuItem>

                            ))}

                        </TextField>
                    </Grid>

                    {/**
                     *  Units
                     */}

                    <Grid xs={2} py={0}>
                        <TextField
                            id="unit"
                            select
                            size="small"
                            // required
                            label="st/m"
                            fullWidth
                            name={`extraItems[${itemIndex}].unit`}
                            defaultValue={item.unit}
                            helperText={errors ? errors.unit && 'Obligatoriskt fält' : ''}

                            {...register(`extraItems[${itemIndex}].unit`)}
                        >
                                
                            {unitsList.map((option) => (
                                <MenuItem key={option.unit} value={option.unit}>
                                    {option.value}
                                </MenuItem>
                            ))}

                        </TextField>            
                    </Grid>

                    {/**
                     *  Save button
                     */}

                    {/* <Grid xs={1} display="flex" justifyContent="flex-end" alignItems="center">
                        <Button 
                            size="small"
                            type='submit'
                            variant="contained"
                            sx={{ backgroundColor: "#68C37C", width: "76px"}}
                            disableElevation
                            onClick={() => onUpdateFittings(item)}
                        >   
                            Spara
                        </Button>
                    </Grid> */}

                </Grid>
            </TableCell>
        </TableRow> 

    )
}

export default EditNestedMaterial