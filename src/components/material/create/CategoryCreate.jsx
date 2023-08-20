import SelectField from "../../reusableComponents/forms/SelectField"

const CategoryCreate = ({ errors, register }) => {
    return (
        <SelectField
            required={true}
            label="Kategori"
            name="category"
            defaultValue=""
            list="category"
            helperText={errors ? errors.category && 'Obligatoriskt fält' : ''}
            register={register("category", {required: true})}
        />
    )
}

export default CategoryCreate