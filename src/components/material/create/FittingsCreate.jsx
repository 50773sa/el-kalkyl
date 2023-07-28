import TextInputField from "../../reusableComponents/forms/TextInputField"

const FittingsCreate = ({ fittingsRef, errors, register }) => {
    return (
        <TextInputField
            required={true}
            label="Tillbehör"
            name="fittings"
            inputRef={fittingsRef}
            defaultValue=""
            autoComplete="fittings"
            helperText={errors ? errors.fittings && 'Obligatoriskt fält' : ''}
            register={register("fittings", {required: true})}
        />
    )
}

export default FittingsCreate