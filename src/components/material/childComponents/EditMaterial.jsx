import { db } from '../../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { uuidv4 } from "@firebase/util"
// mui
import AddIcon from '@mui/icons-material/Add'
import MenuItem from '@mui/material/MenuItem'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import { Button } from "@mui/material";

const hours = [...new Array(13)].map((each, index) => ({ hours: Number(60 * index), value: index }))
const minutes = [...new Array(61)].map((each, index) => ({ minutes: Number(index), value: index }))

const EditMaterial = ({ items, register, errors }) => {

    const handleAddFields = async (data) => { 
        // create an object with empty fields that you can update.  This way, you don't need to think about merging old and new values together when adding more fields.
        await updateDoc(doc(db, 'material', items.id), {
            extraItems: [...data.extraItems, { fittings: '', quantity: 1, unit: '', id: uuidv4()}]
        })
    }

    return (
        <>
            <TableRow sx={{ display: 'grid', gridTemplateColumns: '3fr 3fr 3fr 3fr' }}>

                {/**
                 *  Product
                 */}

                <TableCell sx={{ cursor: 'pointer', border: 'none', borderLeft: '1px solid #e0e0e0' }}>
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
                </TableCell>


                {/**
                 *  Category
                 */}

                <TableCell sx={{ cursor: 'pointer', border: 'none' }}>
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
                </TableCell>


                {/**
                 *  Estimated time
                 */}

                <TableCell sx={{ cursor: 'pointer', border: 'none' }}>
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
                </TableCell>

                <TableCell sx={{ cursor: 'pointer', border: 'none', borderRight: '1px solid #e0e0e0'  }}>
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
                </TableCell>

            </TableRow>

            {/**
             *  Add more newFields button
             */}

            <TableRow sx={{ display: 'grid', gridTemplateColumns: '12fr' }}>
                <TableCell align='right' sx={{ cursor: 'pointer', border: 'none', borderLeft: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0', py: 2 }}>
                    <Button 
                        size="small"
                        variant="contained"
                        sx={{ width: "76px"}}
                        disableElevation
                        onClick={() => handleAddFields(items)}
                    >   
                        <AddIcon/>  Fält
                    </Button>
                </TableCell>
            </TableRow>
        </>
                    
    )
}

export default EditMaterial