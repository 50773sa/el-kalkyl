import SelectField from "../../reusableComponents/forms/SelectField"

const UnitCreate = ({ unitRef, errors, register }) => {
    return (
        <SelectField 
            required={true}
            label="st/m"
            name="unit"
            inputRef={unitRef}
            defaultValue=""
            list="unit"
            helperText={errors ? errors.unit && 'Obligatoriskt fält' : ''}
            register={register("unit", {required: true})}
        /> 
    )
}

export default UnitCreate