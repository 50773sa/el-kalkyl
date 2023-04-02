import React from 'react'
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { uuidv4 } from "@firebase/util"
// mui
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import MenuItem from '@mui/material/MenuItem'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import TextField from '@mui/material/TextField'

const AddMoreFields = ({ register, quantity, fittingsRef, qtyRef, unitRef, unitsList, handleObjectInput, addMoreFields, errors, setInputError }) => {
    const { control, reset } = useForm()

    const {fields, append, remove} = useFieldArray({
        control,
        name: "extraItems",
        defaultValues: [{ fittings: "", qty: "", unit: "" }]
    })

    const addToList = () => {
        // if(fittingsRef?.current.value === "" || qtyRef.current.value === "" || unitRef.current.value === "") {
        //     console.log("Obligatiskt fält")
        //     setInputError(true)
        //     return 
        // }
        handleObjectInput()

        append({ fittings: '', quantity: '', unit: '' })
    }

    return (
        <>
            <React.Fragment key={uuidv4}>
                <Grid xs={12} lg={6}>
                    <TextField 
                        required
                        id="fittings"
                        label="Tillbehör"
                        name="fittings"
                        autoComplete="fittings"
                        fullWidth
                        defaultValue="" 
                        inputRef={fittingsRef}
                        helperText={errors ? errors.fittings && 'Obligatoriskt fält' : ''}


                        // keep ...register. Otherwise the helper text will not be visible.
                        // {...register(`extraItems.${index}.fittings`, {required: true})}
                        // {...register(`fittings.${index}`, {required: true})}
                        // {...register('fittings' + uuidv4(), {required: true})}

                    />
                
                </Grid> 

                {/**
                 *  Quantity
                 */}

                <Grid xs={5} lg={3} >
                    <TextField
                        select
                        required
                        id="qty"
                        label="Antal"
                        name="qty"
                        fullWidth
                        inputRef={qtyRef}
                        defaultValue=""
                        helperText={errors ? errors.qty && 'Obligatoriskt fält' : ''}

                        {...register("qty", {required: true})}
                        // {...register(`extraItems.${index}.qty`, {required: true})}


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

                
                <Grid xs={5} lg={2}>
                    <TextField
                        id="unit"
                        select
                        required
                        label="st/m"
                        fullWidth
                        name="unit"
                        inputRef={unitRef}
                        defaultValue=""
                        helperText={errors ? errors.unit && 'Obligatoriskt fält' : ''}

                        {...register("unit", {required: true})}
                        // {...register(`extraItems.${index}.unit`, {required: true})}

                    >
                            
                        {unitsList.map((option) => (
                            <MenuItem key={option.unit} value={option.unit}>
                                {option.value}
                            </MenuItem>
                        ))}

                    </TextField>
                </Grid> 

                <Grid 
                    xs={1} 
                    lg={1}
                    display='flex' 
                    alignItems="center" 
                    justifyContent="end" 
                >
                    <RemoveCircleIcon 
                        type="button" 
                        fontSize="large" 
                        sx={{ color: "#ff0000" }}
                        onClick={() => ''} 
                    />
                    
                </Grid> 
            </React.Fragment>


                {fields.map((item, index) => {
                    console.log('index', index)
                    return (
                        <React.Fragment key={item.id}>
                            <Grid xs={12} lg={6}>
                                <TextField 
                                    required
                                    id="fittings"
                                    label="Tillbehör"
                                    name={"fittings"}
                                    autoComplete="fittings"
                                    fullWidth
                                    defaultValue="" 
                                    inputRef={fittingsRef}
                                    helperText={errors ? errors.fittings || `extraItems.${index}.fittings` && 'Obligatoriskt fält' : ''}


                                    // keep ...register. Otherwise the helper text will not be visible.
                                    // {...register(`extraItems.${index}.fittings`, {required: true})}
                                    // {...register(`fittings.${index}`, {required: true})}
                                    {...register('fittings' + index, {required: true})}

                                />
                            
                            </Grid> 

                            {/**
                             *  Quantity
                             */}

                            <Grid xs={5} lg={3} >
                                <TextField
                                    select
                                    required
                                    id="qty"
                                    label="Antal"
                                    name="qty"
                                    fullWidth
                                    inputRef={qtyRef}
                                    defaultValue=""
                                    helperText={errors ? errors.qty || `extraItems.${index}.qty` && 'Obligatoriskt fält' : ''}

                                    // {...register("qty", {required: true})}
                                    {...register(`extraItems.${index}.qty`, {required: true})}


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

                            
                            <Grid xs={5} lg={2}>
                                <TextField
                                    id="unit"
                                    select
                                    required
                                    label="st/m"
                                    fullWidth
                                    name="unit"
                                    inputRef={unitRef}
                                    defaultValue=""
                                    helperText={errors ? errors.unit || `extraItems.${index}.unit` && 'Obligatoriskt fält' : ''}

                                    // {...register("unit", {required: true})}
                                    {...register(`extraItems.${index}.unit`, {required: true})}

                                >
                                        
                                    {unitsList.map((option) => (
                                        <MenuItem key={option.unit} value={option.unit}>
                                            {option.value}
                                        </MenuItem>
                                    ))}

                                </TextField>
                            </Grid> 

                            {/* {index > 0 && ( */}
                                <Grid 
                                    xs={1} 
                                    lg={1}
                                    display='flex' 
                                    alignItems="center" 
                                    justifyContent="end" 
                                >
                                    <RemoveCircleIcon 
                                        type="button" 
                                        fontSize="large" 
                                        sx={{ color: "#ff0000" }}
                                        onClick={() => remove(index)} 
                                    />
                                    
                                </Grid> 
                            {/* )} */}
            
                        </React.Fragment>
                    )
                })}

            {/**
             *   Add button
             */}

            <Grid 
                xs={12} 
                display='flex' 
                alignItems="center" 
                justifyContent="end" 
            >
                <AddCircleIcon 
                    titleAccess='Lägg till fler rader' 
                    fontSize="large" 
                    sx={{ color: '#15a715' }}
                    onClick={addToList}
                />    

            </Grid> 


        </> 
    )
}

export default AddMoreFields