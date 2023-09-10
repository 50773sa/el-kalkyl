import { useTranslation } from "react-i18next"
import SelectField from "../../reusableComponents/forms/SelectField"

const MinutesCreate = ({ errors, register }) => {
    const { t } = useTranslation()
    return (
        <SelectField 
            required={true}
            label={t(`materials.placeholders.minutes`, 'Minutes')}
            name="minutes"
            defaultValue=""
            list="minutes"
            helperText={errors ? errors.minutes && 'Obligatoriskt fält' : ''}
            register={register("minutes", {required: true})}
        />
    )
}

export default MinutesCreate