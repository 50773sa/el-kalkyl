import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// components
import TableTextInputField from '../../reusableComponents/forms/TableTextInputField'
// mui
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'

const hours = [...new Array(13)].map((each, index) => ({ hours: Number(60 * index), value: index }))
const minutes = [...new Array(61)].map((each, index) => ({ minutes: Number(index), value: index }))

const EditMaterial = ({ items, register, errors, materialCategory }) => {
    const { t } = useTranslation()

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

                    <Grid size={{ xs: 12, md: 3 }}>
                        <TableTextInputField
                            label={t(`materials.placeholders.product`, 'Product')}
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

                    <Grid size={{ xs: 6, md: 3 }}>    
                        <TextField
                            select
                            size='small'
                            label={t(`materials.placeholders.category`, 'Category')}
                            fullWidth
                            required
                            name="category"
                            defaultValue={categoryRef.current}
                            helperText={errors ? errors.category && 'Obligatoriskt fält' : ''}

                            {...register("category")}
                        >
                            {materialCategory
                                .sort((a,b) => a.value > b.value ? +1 : -1)
                                .map((option, i) => {
                                    return (
                                        <MenuItem key={i} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    )
                                })
                            }
                        </TextField>                                          
                     
                    </Grid>
                
                    {/**
                     *  Estimated time
                     */}

                    <Grid size={{ xs: 6, md: 3 }}>
                        <TextField
                            select
                            size='small'
                            label={t(`materials.placeholders.hours`, 'Hours')}
                            name="hours"
                            fullWidth
                            required
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

                    <Grid size={{ xs: 6, md: 3 }}>
                        <TextField
                            select
                            size='small'
                            label={t(`materials.placeholders.minutes`, 'Minutes')}
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