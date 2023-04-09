// mui
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { Divider, InputAdornment } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'


const SelectedProduct = ({ selectedProduct, numberRef, num, setNum, handleClick, handleDelete }) => {
    return (
        <Grid container spacing={2} xs={12} style={{ marginBottom: "6rem" }} >

            <Typography variant="p" component="div" textAlign='start' sx={{ fontSize: '1.2rem', p: '16px', marginTop: '3rem', cursor: 'default'}}>
                Produkter
            </Typography>   

            <Divider sx={{ marginTop: '1rem'}}/>

            {selectedProduct?.map((item, i) => (
                <Grid xs={12} display="flex" padding={0} ml={1} mr={1} height={1}>
                    <Grid xs={6} display="flex" pl={0} justifyContent="center" alignItems="center">
                        <ListItem value={item} key={i} pl={0}> 
                            {item.product}, {item.quantity}
                        </ListItem>
                    </Grid>
                
                    <Grid xs={4} display="flex" justifyContent="end" alignItems="center" >

                        <TextField
                            key={i}
                            type="number"
                            variant="outlined"
                            inputRef={numberRef}
                            onChange={(e) => (setNum(Number(e.target.value)))}
                            value={num.i}
                            onClick={handleClick(item)}
                            size='small'
                            InputProps={{
                                inputProps: {min: 0, max: 100 },
                                inputMode: 'numeric', pattern: '[0-9]*',
                                endAdornment: <InputAdornment position="end">st</InputAdornment>,
                            }}
                        />

                    </Grid>

                    <Grid xs={2} display="flex" justifyContent="end" alignItems="center" color="red">
                        <DeleteForeverIcon  onClick={handleDelete(item)} />
                    </Grid>
                </Grid>
            ))}
        </Grid>
    )
}

export default SelectedProduct