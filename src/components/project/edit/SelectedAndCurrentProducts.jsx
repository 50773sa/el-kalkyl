import { db } from '../../../firebase'
import { doc,  updateDoc } from 'firebase/firestore'
// mui
import { useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'


const SelectedAndCurrentProducts = ({ currentProject, projectId, selectedProduct, setSelectedProduct, num, setNum, setError, addToDocProducts, setAddToDocProducts, setLoading, t }) => {
    const theme = useTheme()

    // Delete added products from list
    const handleDelete = (selectedItem) => () => {
        setSelectedProduct((items) => items.filter((item) => item?.id !== selectedItem.id))
        setAddToDocProducts((items) => items.filter((item) => item.id !== selectedItem.id))
    }

    //Delete object from Firestore
    const handleDeleteFromFb = (selectedItem) => async () => {
        await updateDoc(doc(db, 'projects', projectId), {
            projectMaterial: currentProject.projectMaterial.filter(pm => pm.id !== selectedItem.id)
        })
    }

    const handleClick = (item) => (e) => {
        e.preventDefault()
        setError(null)

        if (num === 0) {
            return setLoading(false)
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
        <Paper sx={{ height: {xs: 250, md: 350}, overflow: 'auto' }}>
            <List component="div" role="list">

                {currentProject?.projectMaterial?.map((item, i) => {
                    return (
                        <ListItem key={item.id} sx={{ cursor: 'default', px: 4 }}>
                            <ListItemText primary={i + 1 + '. ' +  item.product } /> 

                            <TextField
                                key={item.id}
                                type="number"
                                variant="outlined"
                                onBlur={handleClick(item)}
                                onInput={(e) => setNum(Number(e.target.value))}
                                size='small'
                                defaultValue={item.quantity}
                                inputMode='numeric'
                                slotProps={{
                                    htmlInput: {minLength: 1, maxLength: 3},
                                    input: {
                                        endAdornment: <InputAdornment position="end">{t(`other.pcs`, 'pcs')}</InputAdornment>,
                                    },
                                }}
                            />

                            <IconButton edge="end" aria-label="Remove product from list">
                                <Tooltip title="Remove" sx={{ ml: 2 }}>
                                    <RemoveCircleIcon onClick={handleDeleteFromFb(item)} sx={{ color: theme.palette.error.main }} />
                                </Tooltip>
                            </IconButton>

                        </ListItem>
                    )
                })}

                {selectedProduct?.map((item, i) => {
                    let numberOfMaterial = currentProject.projectMaterial.length
                    
                    return (
                        <ListItem key={item.id} sx={{ cursor: 'default', px: 4 }}>
                            <ListItemText primary={numberOfMaterial + i + 1 + '. ' + item.product} />

                            <TextField
                                key={item.id}
                                type="number"
                                variant="outlined"
                                onBlur={handleClick(item)}
                                onInput={(e) => setNum(Number(e.target.value))}
                                size='small'
                                defaultValue={1}
                                slotProps={{
                                    htmlInput: {minLength: 1, maxLength: 3},
                                    input: {
                                        endAdornment: <InputAdornment position="end">{t(`other.pcs`, 'pcs')}</InputAdornment>,
                                    },
                                }}
                            />

                            <IconButton edge="end" aria-label="Remove product from list">
                                <Tooltip title="Remove" sx={{ ml: 2 }}>
                                    <RemoveCircleIcon onClick={handleDelete(item)} sx={{ color: theme.palette.error.main }} />
                                </Tooltip>
                            </IconButton>
                        </ListItem>
                    )
                })}
            </List>
        </Paper>
    )
}

export default SelectedAndCurrentProducts