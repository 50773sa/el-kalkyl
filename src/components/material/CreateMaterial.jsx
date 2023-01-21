// mui
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import MenuItem from '@mui/material/MenuItem'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'


// dropdowns
const unitsList = [
    {unit: 'st', value: 'st'},
    {unit: 'm', value: 'm'}
]

const quantity = [...new Array(101)].map((each, index) => ({ qty: index, value: index }))
const hours = [...new Array(13)].map((each, index) => ({ hours: 60 * index, value: index }))
const minutes = [...new Array(61)].map((each, index) => ({ minutes: index, value: index }))


const CreateMaterial = ({ 
    handleDelete, 
    handleObjectInput, 
    errors, 
    register, 
    fittingsRef, 
    qtyRef, 
    unitRef, 
    extraItems 
}) => {
   

    return (

        <Grid container spacing={2}>

            {/**
             *  Product
             */}

            <Grid xs={12}>
                <TextField
                    id="product"
                    label="Produkt"
                    name="product"
                    autoComplete="product"
                    fullWidth
                    required
                    helperText={errors ? errors.product && 'Obligatoriskt fält' : ''}

                    {...register("product", {required: true})}
                />
            </Grid>

            {/**
             *  Fittings
             */}

            <Grid xs={12} sm={5}>
                <TextField
                    required
                    id="fittings"
                    label="Tillbehör"
                    name="fittings"
                    autoComplete="fittings"
                    fullWidth
                    inputRef={fittingsRef}
                    helperText={errors ? errors.fittings && 'Obligatoriskt fält' : ''}

                    // keep ...register. Otherwise the helper text will not be visible.
                    {...register("fittings", {required: true})}
                />
            </Grid> 

            {/**
             *  Quantity
             */}

            <Grid xs={5} sm={3} >
                <TextField
                    select
                    required
                    id="qty"
                    label="Antal"
                    name="qty"
                    fullWidth
                    inputRef={qtyRef}
                    defaultValue=""
                    helperText={errors ? errors.qty && 'Obligatoriskt fält' : ''}

                    {...register("qty", {required: true})}

                >
                    {quantity.map((val) => (
                        <MenuItem key={val.qty} value={val.qty}>
                            {val.value}
                        </MenuItem>

                    ))}

                </TextField>
            </Grid>

            {/**
             *  Units
             */}

            <Grid xs={5} sm={3}>
                <TextField
                    id="unit"
                    select
                    required
                    label="st/m"
                    fullWidth
                    name="unit"
                    inputRef={unitRef}
                    defaultValue=""
                    helperText={errors ? errors.unit && 'Obligatoriskt fält' : ''}

                    {...register("unit", {required: true})}
                >
                        
                    {unitsList.map((option) => (
                        <MenuItem key={option.unit} value={option.unit}>
                            {option.value}
                        </MenuItem>
                    ))}

                </TextField>
            </Grid>

            {/**
             *   Add button
             */}

            <Grid 
                xs={2} 
                sm={1}
                display='flex' 
                alignItems="center" 
                justifyContent="end" 
        
            >
                    <AddCircleIcon fontSize="large" onClick={handleObjectInput} />    
            </Grid> 

            {/**
             *  List of selected fittings
             */}

            <Grid xs={12} sm={8} md={6} lg={4} mb={10} >
                    {extraItems?.map((item) => (
                        <List key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <ListItem>{item.fittings}</ListItem>
                            <ListItem>{item.quantity} {item.unit}</ListItem>
                            <RemoveCircleOutlineIcon onClick={handleDelete(item)} sx={{ color: "#ff0000"}}/>
                        </List>
                    ))}
            </Grid>
        
    
            {/**
             *  Estimated time
             */}

            <Grid  xs={12}>
                <Typography variant="h6" component="div">Tidsetimering</Typography>
            </Grid>


            <Grid xs={6} sm={3}>
                <TextField
                    select
                    label="Tim"
                    name="hours"
                    fullWidth
                    required
                    helperText={errors ? errors.hours && 'Obligatoriskt fält' : ''}

                    {...register("hours", { required: true })}
                >
                    {hours.map((option) => (
                        <MenuItem key={option.hours} value={option.hours}>
                            {option.value}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>


            <Grid xs={6} sm={3}>
                <TextField
                    select
                    label="Min"
                    name="minutes"
                    fullWidth
                    required
                    helperText={errors ? errors.minutes && 'Obligatoriskt fält' : ''}

                    {...register("minutes", { required: true })}
                >
                    {minutes.map((option) => (
                        <MenuItem key={option.minutes} value={Number(option.minutes)}>
                            {option.value}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <br/>

                {/**
                 *  Category
                 */}

            <Grid xs={12} >
                <TextField
                    select
                    label="Kategori"
                    fullWidth
                    name="category"
                    required
                    style={{ marginBottom: '6rem'}}
                    helperText={errors ? errors.category && 'Obligatoriskt fält' : ''}

                    {...register("category", { required: true })}>

                    <MenuItem value={'Apparater'}>Apparater</MenuItem>
                    <MenuItem value={'Belysning'}>Belysning</MenuItem>
                    <MenuItem value={'Tele'}>Tele</MenuItem>
                </TextField>
            </Grid>        
        </Grid>
    )
}

export default CreateMaterial