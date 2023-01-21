import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContextProvider'
// mui
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Box from '@mui/material/Box'
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ModeEditOutlineOutlined from '@mui/icons-material/ModeEditOutlineOutlined'
import Typography from '@mui/material/Typography'


const Settings = () => {
    const { currentUser } = useAuthContext()
    const navigate = useNavigate()

    return (
        <Box sx={{ marginBottom: '3em'}}>

            {/**
             *  Links
             */}

            <Typography 
                variant="h6" 
                component="div" 
                textAlign='start' 
                marginBottom='0.5rem'
            >
                <strong>Inställningar</strong>
            </Typography>

            <List>
                <ListItem disablePadding onClick={() => navigate(`/user/${currentUser.uid}/settings/create-material`) }>
                    <ListItemButton sx={{ paddingLeft: '0'}}>
                        <AddCircleIcon />
                        <ListItemText 
                            sx={{ paddingLeft: '1rem'}}
                            primary="Lägg till nytt material" 
                        />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding onClick={() => navigate(`/user/${currentUser.uid}/settings/edit-material`) }>
                    <ListItemButton sx={{ paddingLeft: '0'}}>
                        <ModeEditOutlineOutlined />
                        <ListItemText 
                            sx={{ paddingLeft: '1rem'}}
                            primary="Redigera material" 
                        />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding onClick={() => navigate(`/user/${currentUser.uid}/projects`)} >
                    <ListItemButton sx={{ paddingLeft: '0'}}>
                        <FolderOpenOutlinedIcon />
                        <ListItemText 
                            sx={{ paddingLeft: '1rem'}}
                            primary="Alla projekt" 
                        />
                    </ListItemButton>
                </ListItem>

            </List>
        </Box>
    )

}

export default Settings