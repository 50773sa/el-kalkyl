import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

const SelectForm = ({ required, label, name, inputRef, defaultValue, list, helperText, register }) => {
    return (
        <TextField
            select
            required={required}
            label={label}
            name={name}
            inputRef={inputRef}
            defaultValue={defaultValue}
            fullWidth
            helperText={helperText}
            {...register}
        >
                
            {list.map((option, i) => {
                return (
                    <MenuItem key={option.value} value={option.value}>
                        {option.value}
                    </MenuItem>
                )
            })}
        </TextField>
    )
}

export default SelectForm