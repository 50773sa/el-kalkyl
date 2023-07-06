// components
import DialogDeleteMaterial from '../../modals/DialogDeleteMaterial'
import RemoveButton from '../../reusableComponents/buttons/RemoveButton'
// hooks
import useDeleteDocumentField from '../../../hooks/useDeleteDocumentField'
// mui
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'

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
        <TableRow sx={{ display: 'grid', gridTemplateColumns: '6fr 3fr 2fr 1fr' }}>

            {/**
             *  Fittings
             */}
                
            <TableCell sx={{ cursor: 'pointer', border: 'none', borderLeft: '1px solid #e0e0e0' }}>
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
            </TableCell>

            {/**
             *  Quantity
             */}

            <TableCell sx={{ cursor: 'pointer', border: 'none' }}>
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
            </TableCell>

            {/**
             *  Units
             */}

            <TableCell sx={{ cursor: 'pointer', border: 'none' }}>
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
            </TableCell>
    

            {/** This field is hidden and only used to preserve the 'id' of the object */}
            <input
                type='hidden'
                defaultValue={item.id}
                id="id"
                name={`extraItems[${itemIndex}].id`}
                {...register(`extraItems[${itemIndex}].id`)}
            /> 

            {/**
             *  Remove button
             */}

            <TableCell sx={{ cursor: 'pointer', border: 'none', borderRight: '1px solid #e0e0e0' }}>
                <RemoveButton 
                    size="small" 
                    onClick={() => setIsOpen(true)}
                />
            </TableCell>


            {isOpen && (
                <DialogDeleteMaterial
                    isOpen={isOpen} 
                    setIsOpen={setIsOpen} 
                    setIsLoading={setIsLoading}
                    handleDeleteFromFb={() => handleDeleteMaterialObjectFromFb(item)}
                />
            )}

        </TableRow> 
    )
}

export default EditNestedMaterial