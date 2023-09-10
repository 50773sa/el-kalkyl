import { useTranslation } from "react-i18next"
import SelectField from "../../reusableComponents/forms/SelectField"

const QuantityCreate = ({ qtyRef, reset, errors, register }) => {
    const { t } = useTranslation()
    return (
        <SelectField
            required={true}
            label={t(`materials.placeholders.quantity`, 'Quantity')}
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