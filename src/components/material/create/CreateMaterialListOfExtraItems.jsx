// mui
import { useTheme } from '@mui/material'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import DeleteButton from '../../buttons/DeleteButton'
import Typography from '@mui/material/Typography'

const CreateMaterialListOfExtraItems = ({ extraItems, setExtraItems }) => {
    const theme = useTheme()

    const handleDelete = (selectedItem) => () => {
        setExtraItems((items) => items.filter((item) => item.id !== selectedItem.id))
    }
    
    return (
        <>
            {extraItems.length ? (
                extraItems.map((item, i) => (
                    <List 
                        key={item.id} 
                        sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            height: '50px',
                            width: '100%',
                            borderBottom: '0.2px solid' + theme.palette.color.grey.light,
                        }}
                    >
                        <Grid xs={0.5}>
                            <ListItem>{i + 1 + '.'}</ListItem>
                        </Grid>
                        <Grid xs={5.5}>
                            <ListItem>{item.fittings}</ListItem>
                        </Grid>
                        <Grid xs={2}>
                            <ListItem>{item.quantity}</ListItem>
                        </Grid>
                        <Grid xs={2}>
                            <ListItem>{item.unit}</ListItem>
                        </Grid>

                        {/**
                        *   Delete button
                        */}
                        
                        <Grid xs={2} paddingRight={0}>
                            <ListItem>
                                <DeleteButton
                                    size="small"
                                    sx={{ display: {xs: 'none', md: 'flex'} }}
                                    onClick={handleDelete(item)}
                                />
                            </ListItem>

                        </Grid>
                    </List>
                ))
            ): (
                <Typography sx={{ height: '50px', pl: 2, mt: 2}}>
                    <em sx={{ mt: 5 }}>Inga tillbehör</em>
                </Typography>
            )}
        </>
    )
}

export default CreateMaterialListOfExtraItems