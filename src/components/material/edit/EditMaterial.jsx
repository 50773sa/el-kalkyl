import { db } from '../../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { uuidv4 } from "@firebase/util"
// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import { Button } from "@mui/material";

const hours = [...new Array(13)].map((each, index) => ({ hours: Number(60 * index), value: index }))
const minutes = [...new Array(61)].map((each, index) => ({ minutes: Number(index), value: index }))

const EditMaterial = ({ items, register, errors }) => {

    const handleAddFields = async (data) => { 
        // create an object with empty fields thar you can update.  Thsi way, you don't need to think about merging old and new values together when adding more fields.
        await updateDoc(doc(db, 'material', items.id), {
            extraItems: [...data.extraItems, { fittings: '', quantity: 1, unit: '', id: uuidv4()}]
        })
    }

    return (
        <TableRow>

            {/**
             *  Product
             */}

            <TableCell sx={{ cursor: 'pointer', border: 'none' }}>

                <Grid container spacing={2} py={2} xs={12} sx={{ display: 'flex', alignItems: 'center'}}>
                    <Grid xs={3}>
                        <TextField
                            id="product"
                            size='small'
                            name="product"
                            label="Produkt"
                            autoComplete="product"
                            fullWidth
                            defaultValue={items.product}
                            helperText={errors ? errors.product && 'Obligatoriskt fält' : ''}

                            {...register("product", {
                                required: true, 
                            })}
                        />
                    </Grid>

                    {/**
                     *  Category
                     */}

                    <Grid xs={3}>
                        <TextField
                            select
                            size='small'
                            label="Kategori"
                            fullWidth
                            name="category"
                            defaultValue={items.category}
                            helperText={errors ? errors.category && 'Obligatoriskt fält' : ''}

                            {...register("category")}
                            // {...register("category", { required: true }) }
                        >
                            <MenuItem value={'Apparater'}>Apparater</MenuItem>
                            <MenuItem value={'Belysning'}>Belysning</MenuItem>
                            <MenuItem value={'Data'}>Data</MenuItem>
                            <MenuItem value={'Ovrigt'}>Övrigt</MenuItem>
                        </TextField>
                    </Grid>

                    {/**
                     *  Estimated time
                     */}

                    <Grid xs={3}>
                        <TextField
                            select
                            size='small'
                            label="Tim"
                            name="hours"
                            fullWidth
                            defaultValue={items?.estimatedTime?.hours}
                            helperText={errors ? errors.hours && 'Obligatoriskt fält' : ''}

                            // {...register("estimatedTime.hours"), }
                            {...register("hours", { 
                                // required: true ,
                                setValueAs: val => parseInt(val)
                            })}
                        >
                            {hours.map((option) => (
                                <MenuItem key={option.hours} value={option.hours}>
                                    {option.value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>


                    <Grid xs={2}>
                        <TextField
                            select
                            size='small'
                            label="Min"
                            name="minutes"
                            fullWidth
                            required
                            defaultValue={items.estimatedTime.minutes}
                            helperText={errors ? errors.minutes && 'Obligatoriskt fält' : ''}

                            {...register("minutes", { 
                                // required: true,
                                setValueAs: val => parseInt(val) 
                            })}
                        >
                            {minutes.map((option) => (
                                <MenuItem key={option.minutes} value={Number(option.minutes)}>
                                    {option.value}
                                </MenuItem>
                            ))}                
                        </TextField>
                    </Grid>

                    {/**
                     *  Add more newFields button
                     */}


                    <Grid xs={1} display="flex" justifyContent="flex-end" alignItems="center">
                        <Button 
                            size="small"
                            variant="contained"
                            sx={{ width: "76px"}}
                            disableElevation
                            onClick={() => handleAddFields(items)}
                        >   
                            + Fält
                        </Button>
                    </Grid>

           
          

                </Grid>
            </TableCell>
        </TableRow>
    )
}

export default EditMaterial