import React from 'react'
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import DialogDelete from '../components/modals/DialogDelete';



const AllProjects = () => {
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    function generate(element) {
        return [0, 1, 2].map((value) =>
          React.cloneElement(element, {
            key: value,
          }),
        );
    }
    return (
        <div className='wrapper allProjects' id='allProjects'>
            
			<Grid container spacing={2}>
				<Grid item xs={12}>

					<Typography
						variant="h6" 
						component="div" 
					>
						<strong>Projekt</strong> 
					</Typography>
				</Grid>

				{/**
				 * 	List
				 */}

				<Grid item xs={12}>
                    <List dense={dense}>
                        {generate(
                            <ListItem
                                secondaryAction={
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteOutlinedIcon />
                                    </IconButton>
                                }
                            >
        
                            <ListItemText
                                primary="Single-line item"
                                secondary={secondary ? 'Secondary text' : null}
                            />
                            </ListItem>,
                        )}
                    </List>
				</Grid>

                <DialogDelete onClick={() => {}}/>
			</Grid>
        </div>
    )
}

export default AllProjects