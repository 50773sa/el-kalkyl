import { useTranslation } from "react-i18next"
import SelectField from "../../reusableComponents/forms/SelectField"

const HoursCreate = ({ errors, register }) => {
    const { t } = useTranslation()
    return (
        <SelectField 
            required={true}
            label={t(`materials.placeholders.hours`, 'Hours')}
            name="hours"
            defaultValue=""
            list="hours"
            helperText={errors ? errors.hours && 'Obligatoriskt fält' : ''}
            register={register("hours", {required: true})}
        /> 
    )
}

export default HoursCreate