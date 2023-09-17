import { useTranslation } from 'react-i18next'
// components
import CategoryCreateModal from './CategoryCreateModal'
// mui
import { useTheme } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import TextField  from '@mui/material/TextField'

const CategoryCreate = ({ register, newCategory, setNewCategory, categoryRef, handleNewCategory, isCategoryOpen, setIsCategoryOpen, errors }) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const handleClickOpen = () => {
		setIsCategoryOpen(true),
        setNewCategory('')
	}

    return (
        <>
            <TextField
                select
                required={true}
                label={t(`materials.placeholders.category`, 'Category')}
                name='category'
                defaultValue=""
                fullWidth
                helperText={errors ? errors.category && 'Obligatoriskt fält' : ''}
                {...register("category", {required: true} )}
            >
                <MenuItem 
                    aria-label='create new category'
                    sx={{ 
                        display: 'flex', 
                        justifyContent: 'end', 
                        fontSize: 'small', 
                        color: theme.palette.color.blue.main, 
                        '&.Mui-selected': {
                            backgroundColor: 'transparent',
                        },
                    }}
                    onClick={handleClickOpen}
                >
                    Create new category
                </MenuItem> 

                {newCategory.length && newCategory?.map((option, i) => {
                    return (
                        <MenuItem key={i} value={option.value}>
                            {option.value}
                        </MenuItem>
                    )
                })}
            </TextField>

            {open && (
                <CategoryCreateModal 
                    isCategoryOpen={isCategoryOpen} 
                    setIsCategoryOpen={setIsCategoryOpen} 
                    newCategory={newCategory} 
                    handleNewCategory={handleNewCategory}
                    categoryRef={categoryRef}
                />
            )}
        </>
    )
}

export default CategoryCreate