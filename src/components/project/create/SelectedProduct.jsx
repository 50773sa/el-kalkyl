import { useTranslation } from 'react-i18next'
// helpers
import preventScrollingNumberInput from '../../helpers/preventScrollingNumberInput'
// mui
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

const SelectedProduct = ({ selectedProduct, setSelectedProduct, num, setNum, error, setError, addToDocProducts, setAddToDocProducts, setLoading }) => {
    const { t } = useTranslation()
 
    const handleDelete = (selectedItem) => () => {
        setSelectedProduct((items) => items.filter((item) => item.id !== selectedItem.id))
        setAddToDocProducts((items) => items.filter((item) => item.id !== selectedItem.id))
    }

    // handle selected items
    const handleClick = (item) => (e) => {
        e.preventDefault()
        
        setError(null)

        if (num === 0) {
            return setLoading(false), console.log('No products')
        }

        item.quantity = num

        if (addToDocProducts.includes(item)) {
            setLoading(false)
            return 
        }

        try {
            setLoading(true)
            setAddToDocProducts(selectedProduct => [...selectedProduct, item])

            setLoading(false)

        } catch(err) {
            setError(err)
            setLoading(false)
        }
    }

    return (
        <Paper sx={{ width: '100%', height: {xs: 250, md: 350}, overflow: 'auto'}}>
            <List component="div" role="list">
                {selectedProduct?.length > 0 ? 
                    selectedProduct?.map((item, i) => {
                        return (
                            <ListItem key={item.id} sx={{ cursor: 'default', px: 4 }}>
                                <ListItemText primary={i + 1 + '. ' +  item.product } /> 

                                <TextField
                                    key={i.id}
                                    type="number"
                                    variant="outlined"
                                    size='small'
                                    sx={{ width: 100 }}
                                    required
                                    onBlur={handleClick(item)}
                                    onInput={(e) => setNum(Number(e.target.value))}
                                    placeholder='Antal'
                                    defaultValue={1}
                                    onWheel={(e) => preventScrollingNumberInput(e)}
                                    InputProps={{
                                        inputProps: {minLength: 1, maxLength: 3},
                                        inputMode: 'numeric', 
                                        endAdornment: <InputAdornment position="end">st</InputAdornment>,
                                    }}
                                />

                                <IconButton edge="end" aria-label="Remove product from list">
                                    <Tooltip title="Remove" sx={{ ml: 2 }}>
                                        <RemoveCircleIcon onClick={handleDelete(item)} sx={{ color:'red'}} />
                                    </Tooltip>
                                </IconButton>
                                
                            </ListItem>
                        )
                    }): (
                            <Typography variant="body1" component="p" sx={{ fontSize: '1rem', ml: 4, mt: 2 }}>
                                <em>{t(`projects.listMessage`, 'No products added')}</em>
                            </Typography>
                        )
                }      
            </List>
        </Paper>

    
    )
}

export default SelectedProduct