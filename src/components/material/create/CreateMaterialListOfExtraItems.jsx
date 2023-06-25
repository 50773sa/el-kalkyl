// mui
import Button from '@mui/material/Button'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import Tooltip from "@mui/material/Tooltip"
import Typography from '@mui/material/Typography'
import RemoveButton from '../../reusableComponents/buttons/RemoveButton'

const CreateMaterialListOfExtraItems = ({ extraItems, setExtraItems }) => {

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
                            borderBottom: '0.2px solid lightGrey',
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
                        <Grid xs={2} paddingRight={0}>
                            <ListItem sx={{ display: {xs: 'none', md: 'flex'}, justifyContent: 'center' }}>
                                <RemoveButton 
                                    size="small"
                                    sx={{ display: {xs: 'none', md: 'flex'} }}
                                    onClick={handleDelete(item)}
                                />
                            </ListItem>

                            {/** show on small devices */}
                            <Tooltip title="Radera tillbehöret från listan">
                                <RemoveCircleIcon
                                    sx={{ 
                                        display: {xs: 'flex', md: 'none'},
                                        width: '100%',
                                        fontSize: '40px',
                                        color: '#ff0000', 
                                    }}
                                    onClick={handleDelete(item)}
                                />
                            </Tooltip>
                                
                        </Grid>
                    </List>
                ))
            ): (
                <Typography sx={{ height: '50px', pl: 2, mt: 2}}>
                    <em sx={{ mt: 5}}>Inga tillbehör</em>
                </Typography>
            )}
        </>
    )
}

export default CreateMaterialListOfExtraItems