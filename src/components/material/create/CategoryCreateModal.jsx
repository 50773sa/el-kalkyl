
import { useTranslation } from 'react-i18next'
// mui
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import TextField from '@mui/material/TextField'

const CategoryCreateModal = ({ isCategoryOpen, setIsCategoryOpen, newCategory, categoryRef, onSaveCategory, isErrorCategory, setIsLoading }) => {
	const theme = useTheme()
	const { t } = useTranslation()

	const handleClose = (e, reason) => {
		if (reason !== 'backdropClick') {
			setIsCategoryOpen(false)
			setIsLoading(false)
		}
	}

    return (
		<Dialog disableEscapeKeyDown open={isCategoryOpen} onClose={handleClose}>
			
			<DialogTitle>{t(`modals.createNewCategory`,'Create new category')}</DialogTitle>

			<DialogContent>
				<Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
					<FormControl sx={{ m: 1, minWidth: 300 }}>
						<TextField
							inputRef={categoryRef}
							placeholder={t(`modals.createNewCategoryPlaceholder`,'Name')}
							autoComplete="off"	
						
						/>
						{newCategory.length && !isErrorCategory.error
							? 	<FormHelperText sx={{ color: theme.palette.success.main}}>
									{t(`modals.successMsg`, 'Added to the list')}
								</FormHelperText>
							: 	''
						}
						{isErrorCategory.error && (
							<FormHelperText sx={{ color: theme.palette.error.main}}>
								{isErrorCategory.msg}
							</FormHelperText>
						)}
					</FormControl>
				</Box>
			</DialogContent>

			<DialogActions>
				<Button onClick={handleClose}>
					{t(`buttons.cancel`, 'Cancel')}
				</Button>
				<Button onClick={onSaveCategory}>
					{t(`buttons.save`, 'Save')}
				</Button>
			</DialogActions>

		</Dialog>
    )
}

export default CategoryCreateModal