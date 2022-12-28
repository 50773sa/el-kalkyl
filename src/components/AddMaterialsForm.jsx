// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'


const AddMaterialsForm = ({ handleChange, fittingsAmount }) => {
    return (
        <>
            <Grid item xs={12}>
                <TextField
                    // inputRef={}
                    required
                    fullWidth
                    id="productName"
                    label="Produktnamn"
                    name="productName"
                    autoComplete="productName"
                />
            </Grid>

            <Grid item xs={6}>
                <TextField
                    // inputRef={}
                    required
                    id="fittings"
                    label="Tillbehör"
                    name="fittings"
                    autoComplete="fittings"
                    fullWidth
                />
            </Grid>

            <Grid item xs={3}>
                <TextField
                    required
                    id="select"
                    value={Number}
                    label="Antal"
                    onChange={handleChange}
                    fullWidth
                    select
                >
                    <MenuItem value={10}>10</MenuItem>
                </TextField>
            </Grid>

            <Grid item xs={3}>
                <TextField
                    required
                    id="select"
                    value={fittingsAmount}
                    label="m/st"
                    onChange={handleChange}
                    fullWidth
                    select
                >
                    <MenuItem value={'m'}>m</MenuItem>
                    <MenuItem value={'st'}>st</MenuItem>
                </TextField>
            </Grid>

                <Grid item xs={12}>
                    <TextField
                        // inputRef={}
                        required
                        fullWidth
                        id="select"
                        label="Kategori"
                        onChange={handleChange}
                        name="category"
                        autoComplete="category"
                        select
                        helperText=" "
                    >
                        <MenuItem value={''}>Apparater</MenuItem>
                        <MenuItem value={''}>Belysning</MenuItem>
                        <MenuItem value={''}>Tele</MenuItem>
                </TextField>
            </Grid>
        </>
    )
}

export default AddMaterialsForm