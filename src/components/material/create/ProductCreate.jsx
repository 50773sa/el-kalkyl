import TextInputField from "../../reusableComponents/forms/TextInputField"

const ProductCreate = ({ errors, register }) => {
    return (
        <TextInputField
            required={true}
            label="Produkt"
            name="product"
            autoComplete="product"
            defaultValue=""
            helperText={errors ? errors.product && 'Obligatoriskt fält' : ''}
            register={register("product", {required: true})}
        />
    )
}

export default ProductCreate