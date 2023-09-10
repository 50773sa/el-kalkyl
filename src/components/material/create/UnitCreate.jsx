import { useTranslation } from "react-i18next"
import SelectField from "../../reusableComponents/forms/SelectField"

const UnitCreate = ({ unitRef, errors, register }) => {
    const { t } = useTranslation()
    return (
        <SelectField 
            required={true}
            label={t(`materials.placeholders.unit`, 'pcs/m')}
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