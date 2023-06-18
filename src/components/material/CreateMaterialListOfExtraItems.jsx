// mui
import Button from '@mui/material/Button'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

const CreateMaterialListOfExtraItems = ({ extraItems, setExtraItems }) => {

    const handleDelete = (selectedItem) => () => {
        setExtraItems((items) => items.filter((item) => item.id !== selectedItem.id))
    }
    
    return (
        <>
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
        </>
    )
}

export default CreateMaterialListOfExtraItems