import SelectField from "../../reusableComponents/forms/SelectField"

const QuantityCreate = ({ qtyRef, reset, errors, register }) => {
    return (
        <SelectField
            required={true}
            label="Antal"
            name="qty"
            inputRef={qtyRef}
            defaultValue=""
            list="quantity"
            reset={reset}
            helperText={errors ? errors.qty && 'Obligatoriskt fält' : ''}
            register={register("qty", {required: true})}
        /> 
    )
}

export default QuantityCreate