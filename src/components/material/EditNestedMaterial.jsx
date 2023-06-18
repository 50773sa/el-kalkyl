// hooks
import DialogDeleteMaterial from '../modals/DialogDeleteMaterial'
// mui
import Button from "@mui/material/Button"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import useDeleteDocumentField from '../../hooks/useDeleteDocumentField'

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
        <TableRow>
            <TableCell sx={{ cursor: 'pointer', border: 'none' }}>
                <Grid container xs={12} sx={{ display: 'flex', alignItems: 'center'}}>

                    {/**
                     *  Fittings
                     */}
                    <Grid xs={6} py={0}>
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

                            {...register(`extraItems[${itemIndex}].unit`, {required: true} )}
                        >
                                
                            {unitsList.map((option) => (
                                <MenuItem key={option.unit} value={option.unit}>
                                    {option.value}
                                </MenuItem>
                            ))}

                        </TextField>            
                    </Grid>

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

                    <Grid xs={1} display="flex" justifyContent="flex-end" alignItems="center">
                         <Button 
                            size="small"
                            type='button'
                            variant="outlined"
                            sx={{ color: '#ff0000', borderColor: '#ff0000', width: '76px', '&:hover': {color: 'white', backgroundColor: '#ff0000'} }}
                            disableElevation
                            onClick={() => setIsOpen(true)} 
                        >   
                            <span style={{ whiteSpace: 'nowrap' }}>Ta bort</span>
                        </Button>
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