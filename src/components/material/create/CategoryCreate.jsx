import { useTranslation } from "react-i18next"
import SelectField from "../../reusableComponents/forms/SelectField"

const CategoryCreate = ({ errors, register }) => {
    const { t } = useTranslation()
    return (
        <SelectField
            required={true}
            label={t(`materials.placeholders.category`, 'Category')}
            name="category"
            defaultValue=""
            list="category"
            helperText={errors ? errors.category && 'Obligatoriskt fält' : ''}
            register={register("category", {required: true})}
        />
    )
}

export default CategoryCreate