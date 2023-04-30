// mui
import Box from '@mui/material/Box'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { Divider, InputAdornment } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'


const SelectedProduct = ({ selectedProduct, setSelectedProduct, num, setNum, setError, addToDocProducts, setAddToDocProducts, setLoading }) => {

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
        <Grid container spacing={2} xs={12} style={{ marginBottom: "6rem" }} >

            <Box sx={{ p: '16px', marginTop: '2rem', cursor: 'default'}}>
                <Typography  variant="p" sx={{ fontSize: '1.2rem', marginBottom: '2rem', cursor: 'default'}}>
                    Produkter <br/>
                </Typography>   
                <Divider />

                {selectedProduct?.length === 0 && 
                    <Typography sx={{ fontSize: '1rem', marginTop: '1em'}}>
                        <em>Inga tillagda produkter</em>
                    </Typography>
                }

            </Box>

            {selectedProduct?.map((item, i) => (
                <Grid xs={12} sx={{ display: 'flex', justifyContent: { xs: 'start', md: 'start'}}} key={item.id}>

                    <Grid xs={6} md={2} display="flex" pl={0} justifyContent="center" alignItems="center">
                        <ListItem value={item} key={i.id} pl={0} sx={{ cursor: "default" }}> 
                            {item.product}, {item.quantity}
                        </ListItem>
                    </Grid>
                
                    <Grid xs={4} md={2} display="flex" justifyContent="end" alignItems="center" >
                        <TextField
                            key={i.id}
                            type="text"
                            variant="outlined"
                            onBlur={handleClick(item)}
                            onInput={(e) => setNum(Number(e.target.value))}
                            size='small'
                            InputProps={{
                                inputProps: {min: 0, max: 100},
                                inputMode: 'numeric', 
                                endAdornment: <InputAdornment position="end">st</InputAdornment>,
                            }}
                        />
                    </Grid>

                    <Grid xs={2} md={1}display="flex" justifyContent="end" alignItems="center" color="red">
                        <DeleteForeverIcon  onClick={handleDelete(item)} />
                    </Grid>
                </Grid>
            ))}
        </Grid>
    )
}

export default SelectedProduct