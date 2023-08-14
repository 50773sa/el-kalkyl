import { useRef, useEffect } from 'react'
// components
import TableTextInputField from '../../reusableComponents/forms/TableTextInputField'
// mui
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'

const hours = [...new Array(13)].map((each, index) => ({ hours: Number(60 * index), value: index }))
const minutes = [...new Array(61)].map((each, index) => ({ minutes: Number(index), value: index }))

const EditMaterial = ({ items, register, errors, setValue }) => {

    // Ref is only used here to make MUI happy. Otherwise it will complain about controlled vs. uncontrolled select fields.
    // Another approach would be to use onChange with setValue(react hook form), with value and not defaultValue.
    const categoryRef = useRef(items.category)
    const hoursRef = useRef(items.estimatedTime.hours)
    const minutesRef = useRef(items.estimatedTime.minutes)
  
    useEffect(() => {
        // Set the initial values only once when the component mounts
        categoryRef.current = items.category
        hoursRef.current = items.estimatedTime.hours
        minutesRef.current = items.estimatedTime.minutes
    }, [items])


    return (
        <TableRow sx={{ mb: 2 }}>
            <TableCell sx={{ border: 'none' }} colSpan={6}>
                <Grid container spacing={2}>

                    {/**
                     *  Product
                     */}

                    <Grid xs={6} md={3}>
                        <TableTextInputField
                            label="Produkt"
                            name="product"
                            defaultValue={items.product}
                            autoComplete="product"
                            helperText={errors ? errors.product && 'Obligatoriskt fält' : ''}

                            register={register("product", { required: true })}
                        />
                    </Grid>

                    {/**
                     *  Category
                     */}

                    <Grid xs={6} md={3}>    
                        <TextField
                            select
                            size='small'
                            label="Kategori"
                            fullWidth
                            name="category"
                            defaultValue={categoryRef.current}
                            helperText={errors ? errors.category && 'Obligatoriskt fält' : ''}

                            {...register("category")}
                        >
                            <MenuItem value={'Apparater'}>Apparater</MenuItem>
                            <MenuItem value={'Belysning'}>Belysning</MenuItem>
                            <MenuItem value={'Data'}>Data</MenuItem>
                            <MenuItem value={'Övrigt'}>Övrigt</MenuItem>
                        </TextField>                                          
                     
                    </Grid>
                
                    {/**
                     *  Estimated time
                     */}

                    <Grid xs={6} md={3}>
                        <TextField
                            select
                            size='small'
                            label="Tim"
                            name="hours"
                            fullWidth
                            defaultValue={hoursRef.current}
                            helperText={errors ? errors.hours && 'Obligatoriskt fält' : ''}

                            {...register("hours", { 
                                setValueAs: val => parseInt(val)
                            })}
                        >
                            {hours.map((option) => (
                                <MenuItem key={option.hours} value={option.hours}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>                   
                    </Grid>           

                    <Grid xs={6} md={3}>
                        <TextField
                            select
                            size='small'
                            label="Min"
                            name="minutes"
                            fullWidth
                            required
                            defaultValue={minutesRef.current}
                            helperText={errors ? errors.minutes && 'Obligatoriskt fält' : ''}

                            {...register("minutes", { 
                                setValueAs: val => parseInt(val) 
                            })}
                        >
                            {minutes.map((option) => (
                                <MenuItem key={option.minutes} value={Number(option.minutes)}>
                                    {option.value}
                                </MenuItem>
                            ))}                
                        </TextField>         
                    </Grid>

                </Grid>
            </TableCell>
        </TableRow>            
    )
}

export default EditMaterial