import SelectField from "../../reusableComponents/forms/SelectField"

const MinutesCreate = ({ errors, register }) => {
    return (
        <SelectField 
            required={true}
            label="Min"
            name="minutes"
            defaultValue=""
            list="minutes"
            helperText={errors ? errors.minutes && 'Obligatoriskt fält' : ''}
            register={register("minutes", {required: true})}
        />
    )
}

export default MinutesCreate