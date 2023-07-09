import TextField from '@mui/material/TextField'

const TextInputField = ({ required, label, name, inputRef, defaultValue, autoComplete, helperText, register }) => {
    return (
        <TextField
            sx={{ backgroundColor: '#fff'}}
            type='text'
            required={required}
            label={label}
            name={name}
            inputRef={inputRef}
            defaultValue={defaultValue}
            autoComplete={autoComplete}
            helperText={helperText}
            fullWidth
            {...register}
        />
    )
}

export default TextInputField