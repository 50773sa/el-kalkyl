// components
import DialogDeleteMaterial from '../../modals/DialogDeleteMaterial'
import RemoveButton from '../../reusableComponents/buttons/RemoveButton'
// hooks
import useDeleteDocumentField from '../../../hooks/useDeleteDocumentField'
// mui
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import TextField from '@mui/material/TextField'
import TableRow from '@mui/material/TableRow'

// dropdowns
const unitsList = [
    {unit: 'st', value: 'st'},
    {unit: 'm', value: 'm'}
]
const quantity = [...new Array(101)].map((_each, index) => ({ qty: index, value: index }))


const EditNestedMaterial = ({ item, items, errors, register, itemIndex, reset }) => {
    const { deleteDocumentField, isOpen, setIsOpen, setIsLoading } = useDeleteDocumentField('material')

    const handleDeleteMaterialObjectFromFb = async (item) => {
        await deleteDocumentField(items, item)
    }

    return (
        <TableRow sx={{ display: 'grid', my: 2, mx: 2 }}>
            <TableCell sx={{ cursor: 'pointer', border: 'none' }} >
                <Grid container spacing={2}>

                    {/**
                     *  Fittings
                     */}

                    <Grid xs={12} md={6} sx={{ borderLeft: '5px solid grey', borderRadius: { xs: '5px 0', md: '5px' } }}>
                        <TextField
                            size="small"
                            label="Tillbehör"
                            id="fittings"
                            defaultValue={item.fittings}
                            name={`extraItems[${itemIndex}].fittings`}
                            autoComplete="fittings"
                            fullWidth
                            helperText={errors ? errors.fittings && 'Obligatoriskt fält' : ''}

                            {...register(`extraItems[${itemIndex}].fittings`, {required: true} )}
                        /> 
                    </Grid>

                    {/**
                     *  Quantity
                     */}

                    <Grid xs={3} md={2.5} sx={{ borderLeft: { xs: '5px solid grey', md: 'none'}, borderRadius: '0 5px' }}>
                        <TextField
                            select
                            // required
                            size="small"
                            id="quantity"
                            label="Antal"
                            name={`extraItems[${itemIndex}].quantity`}
                            fullWidth
                            defaultValue={item.quantity}
                            helperText={errors ? errors.quantity && 'Obligatoriskt fält' : ''}

                            {...register(`extraItems[${itemIndex}].quantity`, {required: true} )}

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

                    <Grid xs={3} md={2.5}>
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

                            {...register(`extraItems[${itemIndex}].unit`, {required: true} )}
                        >    
                            {unitsList.map((option) => (
                                <MenuItem key={option.unit} value={option.unit}>
                                    {option.value}
                                </MenuItem>
                            ))}

                        </TextField>   
                    </Grid>
            
                    <Grid xs={3} md={1} display="flex" alignItems="center" justifyContent="center">
                        {/** This field is hidden and only used to preserve the 'id' of the object */}
                        <input
                            type='hidden'
                            defaultValue={item.id}
                            id="id"
                            name={`extraItems[${itemIndex}].id`}
                            {...register(`extraItems[${itemIndex}].id`)}
                        /> 

                        {/**
                         *  Delete button
                         */}

                        <RemoveButton 
                            size="small" 
                            onClick={() => setIsOpen(true)}
                        />
                    </Grid>

                    {isOpen && (
                        <DialogDeleteMaterial
                            isOpen={isOpen} 
                            setIsOpen={setIsOpen} 
                            setIsLoading={setIsLoading}
                            handleDeleteFromFb={() => handleDeleteMaterialObjectFromFb(item)}
                        />
                    )}

                </Grid>
            </TableCell>
        </TableRow> 
    )
}

export default EditNestedMaterial