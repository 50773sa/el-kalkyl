import { useTranslation } from 'react-i18next'
// components
import CategoryCreateModal from './CategoryCreateModal'
// mui
import { useTheme } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import TextField  from '@mui/material/TextField'

const CategoryCreate = ({ register, newCategory, setNewCategory, categoryRef, handleNewCategory, isCategoryOpen, setIsCategoryOpen, errors, materialCategory, onSaveCategory, isErrorCategory, setIsLoading }) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const handleClickOpen = () => {
		setIsCategoryOpen(true),
        setNewCategory([])
	}

    return (
        <>
            <TextField
                select
                required={true}
                label={t(`materials.placeholders.category`, 'Category')}
                name='category'
                // defaultValue=""
                fullWidth
                helperText={errors ? errors.category && 'Obligatoriskt fält' : ''}
                {...register("category", {required: true} )}
            >
                <MenuItem 
                    aria-label={t(`materials.createNewCategory`, 'Create new category')}
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
                    {t(`materials.createNewCategory`, 'Create new category')}
                </MenuItem> 

                {materialCategory
                    .sort((a,b) => a.value > b.value ? +1 : -1)
                    .map((option, i) => {
                        return (
                            <MenuItem key={i} value={option.value}>
                                {option.value.charAt(0).toUpperCase() + option.value.slice(1)}
                            </MenuItem>
                        )
                    })
                }
          
            </TextField>

            {open && (
                <CategoryCreateModal 
                    isCategoryOpen={isCategoryOpen} 
                    setIsCategoryOpen={setIsCategoryOpen} 
                    newCategory={newCategory} 
                    handleNewCategory={handleNewCategory}
                    categoryRef={categoryRef}
                    onSaveCategory={onSaveCategory}
                    isErrorCategory={isErrorCategory}
                    setIsLoading={setIsLoading}
                />
            )}
        </>
    )
}

export default CategoryCreate