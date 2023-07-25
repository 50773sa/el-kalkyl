import TextField from '@mui/material/TextField'

const TableTextInputField = ({ label, name, defaultValue, autoComplete, helperText, register }) => {
    return (
        <TextField
            sx={{ backgroundColor: '#fff' }}
            fullWidth
            size='small'
            type='text'
            required
            label={label}
            name={name}
            defaultValue={defaultValue}
            autoComplete={autoComplete}
            helperText={helperText}
            {...register}
         />
            
    )
}

export default TableTextInputField