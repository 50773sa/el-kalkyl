import React, { useEffect, useState } from 'react'
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


const EmptyFields = ({ item, items, errors, register, itemIndex, setOpen, setLoading , fields, setFields}) => {
    const [indexOfNewFields, setIndexOfNewFields] = useState()

    const handleRemoveFields = (index) => {
        const values = [...fields]
        values.splice(index, 1)
        setFields(values)
    }

    useEffect(() => {
        setIndexOfNewFields(items.extraItems.length + fields.length)

    }, [indexOfNewFields, items])

    return (
        <TableRow id="emptyFields">
            <TableCell sx={{ cursor: 'pointer', border: 'none' }}>
                <Grid container xs={12} sx={{ display: 'flex', alignItems: 'center'}}>
                    {fields.map((field, i) => {
                        return (
                            <>
                                <Grid xs={6}  py={0} key={i}>
                                    <TextField
                                        size="small"
                                        label="Tillbehör"
                                        id="fittings"
                                        defaultValue=""
                                        name={`extraItems[${indexOfNewFields}].fittings`}
                                        // name="fittings"
                                        autoComplete="fittings"
                                        fullWidth

                                        // onChange={(event) => handleInputChange(i, event)}

                                        helperText={errors ? errors.fittings && 'Obligatoriskt fält' : ''}

                                        {...register(`extraItems[${indexOfNewFields}].fittings`)}
                                        />  
                                </Grid>

                                <Grid xs={3} py={0}>
                                    <TextField
                                        select
                                        // required
                                        size="small"
                                        id="quantity"
                                        label="Antal"
                                        name={`extraItems[${indexOfNewFields}].quantity`}
                                        // name="quantity"
                                        fullWidth
                                        defaultValue={1}
                                        helperText={errors ? errors.quantity && 'Obligatoriskt fält' : ''}

                                        {...register(`extraItems[${indexOfNewFields}].quantity`)}

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
                                        id="unit"
                                        select
                                        size="small"
                                        // required
                                        label="st/m"
                                        fullWidth
                                        name={`extraItems[${indexOfNewFields}].unit`}
                                        defaultValue=""
                                        helperText={errors ? errors.unit && 'Obligatoriskt fält' : ''}

                                        {...register(`extraItems[${indexOfNewFields}].unit`, {required:true} )}
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
                            </>
                        

                    

                        )
                        
                    })}
                
                </Grid>
            </TableCell>
        </TableRow>        
    )
}

export default EmptyFields