import React from 'react'
import { db } from '../../firebase'
import { doc,  updateDoc } from 'firebase/firestore'
// mui
import Box from '@mui/material/Box'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import ListItem from '@mui/material/ListItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { InputAdornment } from '@mui/material'


const SelectedAndCurrentProducts = ({ currentProject, projectId, selectedProduct, setSelectedProduct, num, setNum, setError, addToDocProducts, setAddToDocProducts, setLoading }) => {

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
    console.log('addToDocProducts', addToDocProducts)

    return (
        <Grid container spacing={2} xs={12} style={{ marginBottom: "6rem" }} >
            <Box sx={{ p: '16px', marginTop: '2rem', cursor: 'default'}}>
                <Typography  variant="p" sx={{ fontSize: '1.2rem', marginBottom: '2rem', cursor: 'default'}}>
                    Produkter <br/>
                </Typography>   
            </Box>

            {currentProject?.projectMaterial?.map((item, i) => (
                <Grid xs={12} key={item.id} display="flex" padding={0} ml={1} mr={1} height={1}>
                    <Grid xs={6} display="flex" pl={0} justifyContent="center" alignItems="center">
                        <ListItem value={item} key={i.id} pl={0} sx={{ cursor: "default" }}> 
                            {item.product}, {item.quantity}
                        </ListItem>
                    </Grid>
                
                    <Grid xs={4} display="flex" justifyContent="end" alignItems="center" >
                        <TextField
                            key={item.id}
                            type="text"
                            variant="outlined"
                            onBlur={handleClick(item)}
                            onInput={(e) => setNum(Number(e.target.value))}
                            size='small'
                            defaultValue={item.quantity}
                            InputProps={{
                                inputProps: {min: 0, max: 100},
                                inputMode: 'numeric', 
                                endAdornment: <InputAdornment position="end">st</InputAdornment>,
                            }}
                        />
                    </Grid>

                    <Grid xs={2} display="flex" justifyContent="end" alignItems="center" color="red">
                        <DeleteForeverIcon  onClick={handleDeleteFromFb(item)} />
                    </Grid>
                </Grid>

            ))}

            {selectedProduct?.map((item, i) => (
                <Grid xs={12} key={item.id} display="flex" padding={0} ml={1} mr={1} height={1}>
                    <Grid xs={6} display="flex" pl={0} justifyContent="center" alignItems="center">
                        <ListItem value={item} key={i.id} pl={0} sx={{ cursor: "default" }}> 
                            {item.product}, {item.quantity}
                        </ListItem>
                    </Grid>
                
                    <Grid xs={4} display="flex" justifyContent="end" alignItems="center" >
                        <TextField
                            key={item.id}
                            type="text"
                            variant="outlined"
                            onBlur={handleClick(item)}
                            onInput={(e) => setNum(Number(e.target.value))}
                            size='small'
                            defaultValue="1"
                            InputProps={{
                                inputProps: {min: 1, max: 100},
                                inputMode: 'numeric', 
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

export default SelectedAndCurrentProducts