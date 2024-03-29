import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
// components
import DeleteButton from '../../buttons/DeleteButton'
import DialogDeleteMaterial from '../../modals/DialogDeleteMaterial'
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
    {unit: 'pcs', value: 'pcs'},
    {unit: 'm', value: 'm'}
]
const quantity = [...new Array(101)].map((_each, index) => ({ qty: index, value: index }))


const EditNestedMaterial = ({ item, items, errors, register, itemIndex }) => {
    const { t } = useTranslation()
    const quantityRef = useRef(item.quantity)
    const unitRef = useRef(item.unit)
    const idRef = useRef(item.id)

    useEffect(() => {
        // Set the initial values only once when the component mounts
        quantityRef.current = item.quantity
        unitRef.current = item.unit
        idRef.current = item.id
    }, [items])

    const { deleteDocumentField, isOpen, setIsOpen, setIsLoading } = useDeleteDocumentField('material')

    const handleDeleteMaterialObjectFromFb = async (item) => {
        await deleteDocumentField(items, item)
    }

    return (
        <TableRow>
            <TableCell colSpan={6} sx={{ cursor: 'pointer', border: 'none' }}>
                <Grid container spacing={2} sx={{ ml: 1, mr: { xs: 0, md: 1 }, mt: 0.5}}>

                    {/**
                     *  Fittings
                     */}

                    <Grid xs={12} md={6} sx={{ borderLeft: '5px solid grey', borderRadius: { xs: '5px 0', md: '5px' }, pr: { xs: 0, md: 1 } }}>
                        <TextField
                            size="small"
                            label={t(`materials.placeholders.fitting`, 'Fitting')}
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

                    <Grid xs={5} md={2.5} sx={{ borderLeft: { xs: '5px solid grey', md: 'none'}, borderRadius: '0 5px' }}>
                        <TextField
                            select
                            // required
                            size="small"
                            id="quantity"
                            label={t(`materials.placeholders.quantity`, 'Quantity')}
                            name={`extraItems[${itemIndex}].quantity`}
                            fullWidth
                            defaultValue={quantityRef.current}
                            helperText={errors ? errors.quantity && 'Obligatoriskt fält' : ''}

                            {...register(`extraItems[${itemIndex}].quantity`, {
                                    required: true,
                                    setValueAs: val => parseInt(val)
                                } 
                            )}

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

                    <Grid xs={5} md={2.5}>
                        <TextField
                            id="unit"
                            select
                            size="small"
                            // required
                            label={t(`materials.placeholders.unit`, 'pcs/m')}
                            fullWidth
                            name={`extraItems[${itemIndex}].unit`}
                            defaultValue={unitRef.current}
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
            
                    <Grid xs={2} md={1} sx={{ display: 'flex', justifyContent: { xs: 'right', md: 'right', mr: { xs: 2, md: 0}, px: 0  }}}>
                        {/** This field is hidden and only used to preserve the 'id' of the object */}
                        <input
                            type='hidden'
                            defaultValue={idRef.current}
                            id="id"
                            name={`extraItems[${itemIndex}].id`}
                            {...register(`extraItems[${itemIndex}].id`)}
                        /> 

                        {/**
                         *  Delete button
                         */}

                        <DeleteButton
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