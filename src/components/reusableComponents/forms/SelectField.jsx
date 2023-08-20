import { useEffect, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

const unitList = [{value: 'st'}, {value: 'm'}]
const quantityList = [...new Array(101)].map((each, index) => ({ qty: index, value: index }))
const hoursList = [...new Array(13)].map((each, index) => ({ hours: 60 * index, value: index }))
const minutesList = [...new Array(61)].map((each, index) => ({ minutes: index, value: index }))
const categoryList = [
    {category: 'Apparater', value: 'Apparater'},
    {category: 'Data', value: 'Data'},
    {category: 'Belysning', value: 'Belysning'},
    {category: 'Övrigt', value: 'Övrigt'},
]

const SelectField = ({ required, label, name, inputRef, defaultValue, list, helperText, register }) => {
    const [currentListToRender, setCurrentListToRender] = useState([])

    useEffect(() => {
        if (list === 'category') setCurrentListToRender(categoryList)
        if (list === 'quantity') setCurrentListToRender(quantityList)
        if (list === 'unit') setCurrentListToRender(unitList)
        if (list === 'hours') setCurrentListToRender(hoursList)
        if (list === 'minutes') setCurrentListToRender(minutesList)
    }, [])

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
            {currentListToRender && currentListToRender.map((option, i) => {
                return (
                    <MenuItem key={i} value={list === 'hours' ? option.hours : option.value}>
                        {option.value}
                    </MenuItem>
                )
            })}
        </TextField>
    )
}

export default SelectField