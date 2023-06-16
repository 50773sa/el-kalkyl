import React from 'react'
import SelectField from '../reusableComponents/forms/SelectField'
import TextFields from '../reusableComponents/forms/TextFields'
// mui
import Button from '@mui/material/Button'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Typography from '@mui/material/Typography'
import { TextField } from '@mui/material'

const CreateMaterial = ({ 
    handleDelete, 
    handleObjectInput, 
    errors, 
    register, 
    fittingsRef, 
    qtyRef, 
    unitRef, 
    extraItems,
    inputError,
}) => {


    return (
        <Grid container xs={12} >

            <Grid xs={12}>
                <Typography variant="h6" component="div" textAlign='start' marginBottom='2rem' sx={{ cursor: "default" }}>
                    <strong>Lägg till nytt material</strong> 
                </Typography>    
            </Grid>
    
            {/**
             *  Product
             */}

            <Grid xs={12} lg={6}>
                <TextFields
                     required={true}
                     label="Produkt"
                     name="product"
                     autoComplete="product"
                     defaultValue=""
                     helperText={errors ? errors.product && 'Obligatoriskt fält' : ''}
                     register={register("product", {required: true})}
                />
            </Grid>

            {/**
             *  Category
             */}

            <Grid xs={12} lg={6} >
                <SelectField 
                    required={true}
                    label="Kategori"
                    name="category"
                    defaultValue=""
                    list="category"
                    helperText={errors ? errors.category && 'Obligatoriskt fält' : ''}
                    register={register("category", {required: true})}
                />  
            </Grid> 

            {/**
             *  Fittings
             */}

            <Grid xs={12} sm={6} >
                {/* <TextField
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
                /> */}

                <TextFields
                     required={true}
                     label="Tillbehör"
                     name="fittings"
                     inputRef={fittingsRef}
                     defaultValue=""
                     autoComplete="fittings"
                     helperText={errors ? errors.fittings && 'Obligatoriskt fält' : ''}
 
                     register={register("fittings", {required: true})}
                />
            </Grid> 

            {/**
             *  Quantity
             */}

            <Grid xs={5} sm={2} lg={2} >
                <SelectField 
                    required={true}
                    label="Antal"
                    name="qty"
                    inputRef={qtyRef}
                    defaultValue=""
                    list="quantity"
                    helperText={errors ? errors.qty && 'Obligatoriskt fält' : ''}
                    register={register("qty", {required: true})}
                /> 
            </Grid>

            {/**
             *  Units
             */}

            <Grid xs={5} sm={2}>
                <SelectField 
                    required={true}
                    label="st/m"
                    name="unit"
                    inputRef={unitRef}
                    defaultValue=""
                    list="unit"
                    helperText={errors ? errors.unit && 'Obligatoriskt fält' : ''}
                    register={register("unit", {required: true})}
                /> 
            </Grid>


            {/**
             *   Add button
             */}

            <Grid 
                xs={2} 
                lg={2}
                display='flex' 
                // alignItems="center" 
                justifyContent="end"        
            >
                <Button 
                    variant="outlined" 
                    sx={{ width: '8rem', p: 1 }} 
                    onClick={handleObjectInput}
                >
                    Lägg till
                </Button>
                
            </Grid> 


            <Grid xs={12} sx={{ marginTop: '2rem', marginBottom: '6rem' }}>
                {/* <Typography variant="h6">Tillagt material:</Typography> */}

                {inputError &&
                    <Typography sx={{ color: "#ff0000" }}>
                        Glöm inte lägga till materialet i listan!
                    </Typography>  
                }

                {extraItems?.map((item) => (
                    <List 
                        key={item.id} 
                        sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            height: '50px', 
                            width: '100%',
                            borderBottom: '0.2px solid lightGrey',
                        }}
                    >

                        <Grid xs={6}>
                            <ListItem>{item.fittings}</ListItem>
                        </Grid>
                        <Grid xs={2}>
                            <ListItem>{item.quantity}</ListItem>
                        </Grid>
                        <Grid xs={2}>
                            <ListItem>{item.unit}</ListItem>
                        </Grid>
                        <Grid xs={2} paddingRight={0}>
                            <ListItem sx={{ justifyContent: 'end', paddingRight: 0}}>
                                <Button 
                                    variant="outlined" 
                                    sx={{ p: 1, width: '8rem', borderColor: ' #ff0000', color: '#ff0000' }} 
                                    onClick={handleDelete(item)}
                                >
                                X  Ta bort
                                </Button>
                            </ListItem>
                        </Grid>
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
                <SelectField 
                    required={true}
                    label="Tim"
                    name="hours"
                    defaultValue=""
                    list="hours"
                    helperText={errors ? errors.hours && 'Obligatoriskt fält' : ''}
                    register={register("hours", {required: true})}
                /> 
            </Grid>


            <Grid xs={6} sm={3}>
                <SelectField 
                    required={true}
                    label="Min"
                    name="minutes"
                    defaultValue=""
                    list="minutes"
                    helperText={errors ? errors.minutes && 'Obligatoriskt fält' : ''}
                    register={register("minutes", {required: true})}
                /> 
            </Grid>

            <br/>
       
        </Grid>
    )
}

export default CreateMaterial