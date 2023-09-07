import { useTranslation } from "react-i18next"
import TextInputField from "../../reusableComponents/forms/TextInputField"

const ProductCreate = ({ errors, register }) => {
    const { t } = useTranslation()
    return (
        <TextInputField
            required={true}
            label={t(`materials.placeholders.product`, 'Product')}
            name="product"
            autoComplete="product"
            defaultValue=""
            helperText={errors ? errors.product && 'Obligatoriskt fält' : ''}
            register={register("product", {required: true})}
        />
    )
}

export default ProductCreate