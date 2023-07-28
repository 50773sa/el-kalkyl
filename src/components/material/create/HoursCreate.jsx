import SelectField from "../../reusableComponents/forms/SelectField"

const HoursCreate = ({ errors, register }) => {
    return (
        <SelectField 
            required={true}
            label="Tim"
            name="hours"
            defaultValue=""
            list="hours"
            helperText={errors ? errors.hours && 'Obligatoriskt fält' : ''}
            register={register("hours", {required: true})}
        /> 
    )
}

export default HoursCreate