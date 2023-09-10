import { useTranslation } from "react-i18next"
import TextInputField from "../../reusableComponents/forms/TextInputField"

const FittingsCreate = ({ fittingsRef, errors, register }) => {
    const { t } = useTranslation()
    return (
        <TextInputField
            required={true}
            label={t(`materials.placeholders.fitting`, 'Fitting')}
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