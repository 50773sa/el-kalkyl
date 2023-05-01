import React from 'react'
import { useRef } from "react"
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


const EditNestedMaterial = ({ item, register, errors, fittings }) => {
    const fittingsRef = useRef(null)
    const unitRef = useRef(null)
    const qtyRef = useRef(null)


    return (
        <TableRow>
            <TableCell sx={{ cursor: 'pointer', border: 'none' }}>
                <Grid container xs={12}>

                    {/**
                     *  Fittings
                     */}

                    <Grid xs={6} py={0}>
                        <TextField
                            required
                            size="small"
                            id="fittings"
                            label="Tillbehör"
                            name="fittings"
                            autoComplete="fittings"
                            fullWidth
                            inputRef={fittingsRef}
                            defaultValue={item.fittings}
                            helperText={errors ? errors.fittings && 'Obligatoriskt fält' : ''}

                            // keep ...register. Otherwise the helper text will not be visible.
                            {...register("fittings", {required: true})}
                        />   
                    </Grid>

                    {/**
                     *  Quantity
                     */}

                    <Grid xs={3} py={0}>
                        <TextField
                            select
                            required
                            size="small"
                            id="qty"
                            label="Antal"
                            name="qty"
                            fullWidth
                            inputRef={qtyRef}
                            defaultValue={item.quantity}
                            helperText={errors ? errors.qty && 'Obligatoriskt fält' : ''}

                            {...register("qty", {required: true})}

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
                            required
                            label="st/m"
                            fullWidth
                            name="unit"
                            inputRef={unitRef}
                            defaultValue={item.unit}
                            helperText={errors ? errors.unit && 'Obligatoriskt fält' : ''}

                            {...register("unit", {required: true})}
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

                    <Grid xs={1} display="flex" justifyContent="flex-end" alignItems="center">
                        <Button 
                            size="small"
                            variant="contained"
                            sx={{ backgroundColor: "#68C37C" }}
                            disableElevation
                        >   
                            Spara
                        </Button>
                    </Grid>

                </Grid>
            </TableCell>
        </TableRow> 

    )
}

export default EditNestedMaterial