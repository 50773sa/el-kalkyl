import React, { useEffect, useState, useRef } from 'react'
import { useForm } from "react-hook-form"
import { db } from '../../firebase'
import { uuidv4 } from "@firebase/util"

// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import { Button } from "@mui/material";
import DialogDeleteMaterial from '../modals/DialogDeleteMaterial'

// dropdowns
const unitsList = [
    {unit: 'st', value: 'st'},
    {unit: 'm', value: 'm'}
]

const quantity = [...new Array(101)].map((each, index) => ({ qty: index, value: index }))


const EmptyFields = ({ errors, newFields, setNewFields, newFieldsError, register, setValue, }) => {
 
    const handleRemoveFields = (index) => {
        const values = [...newFields]
        values.splice(index, 1)
        setNewFields(values)
    }

    const handleInputChange = (index, property, value) => {
        const addedFields = [...newFields]
        addedFields[index][property] = value
        setNewFields(addedFields)
    }

    return (
        <>
            {newFields.map((field, i) => {
                return (
                    <TableRow id="emptyFields"  key={i}>
                        <TableCell sx={{ cursor: 'pointer', border: 'none' }}>
                            <Grid container xs={12} sx={{ display: 'flex', alignItems: 'center'}}>
                            
                                <Grid xs={6}  py={0}>
                                    <TextField
                                        size="small"
                                        error
                                        required
                                        label="Tillbehör"
                                        name={`extraItems[${i}].fittings`}
                                        autoComplete="fittings"
                                        fullWidth
                                        
                                        helperText={newFieldsError.fittings ? 'Obligatoriskt fält' : ' '}
                                        // onChange={(e) => handleInputChange(i, "fittings", e.target.value)} // denna funkar

                                        // {...register(`newFields[${i}].fittings`, {required: true} )}
                                        // {...register("fittings", {required: true} )}
                                        />  
                                </Grid>

                                <Grid xs={3} py={0}>
                                    <TextField
                                        select
                                        required
                                        size="small"
                                        label="Antal"
                                        name="quantity"
                                        fullWidth
                                        defaultValue={1}
                                        helperText={newFieldsError.quantityErr ? 'Obligatoriskt fält' : ' '}
                                        onChange={(e) => handleInputChange(i, "quantity", e.target.value)}


                                        // {...register("quantity", {required: true} )}

                                    >
                                        {quantity.map((val) => (
                                            <MenuItem key={val.qty} value={val.qty}>
                                                {val.value}
                                            </MenuItem>

                                        ))}

                                    </TextField>
                                </Grid>

                                <Grid xs={2} py={0}>
                                    <TextField
                                        select
                                        size="small"
                                        required
                                        label="st/m"
                                        fullWidth
                                        defaultValue=""
                                        name="unit"
                                        helperText={newFieldsError.unitErr ? 'Obligatoriskt fält' : ' '}
                                        onChange={(e) => (handleInputChange(i, "unit", e.target.value), console.log('e', e.target.value))}

                                        // {...register("unit", {required: true} )}

                                        // {...register(`extraItems[${indexOfNewFields}].unit`, {required:true} )}
                                    >
                                            
                                        {unitsList.map((option) => (
                                            <MenuItem key={option.unit} value={option.unit}>
                                                {option.value}
                                            </MenuItem>
                                        ))}

                                    </TextField>            
                                </Grid>

                                <Grid xs={1} display="flex" justifyContent="flex-end" alignItems="center">
                                    <Button 
                                        size="small"
                                        type='submit'
                                        variant="outlined"
                                        sx={{ color: '#ff0000', borderColor: '#ff0000', width: "76px" }}
                                        disableElevation
                                        onClick={handleRemoveFields} 
                                    >   
                                        <span style={{ whiteSpace: 'nowrap' }}>Ta bort</span>
                                    </Button>
                                </Grid>

                            </Grid>
                        </TableCell>
                    </TableRow>  
                )                                  
            })}
        </>      
    )
}

export default EmptyFields