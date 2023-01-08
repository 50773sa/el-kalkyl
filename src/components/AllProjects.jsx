import React from 'react'
import { useState } from 'react'



import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import DialogDelete from '../components/modals/DialogDelete'
import useStreamCollection from '../hooks/useStreamCollection'
import { useAuthContext } from '../contexts/AuthContextProvider'
import LoadingBackdrop from './LoadingBackdrop'
import { useNavigate } from 'react-router-dom'
import useStreamDoc from '../hooks/useStreamDoc'




const AllProjects = () => {
    const navigate = useNavigate()

    const { currentUser } = useAuthContext()
    const { data: projects, loading} = useStreamCollection('projects')

    // console.log('projects', projects?.map(list => list))




    return (
        <div className='wrapper' id='allProjectsWrapper'>

            {loading ? <LoadingBackdrop /> : ''}

			<Grid container spacing={2}>
				<Grid xs={12}>

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

				<>
                    {!loading && projects ? projects?.map((list) => (
                            <Grid xs={10}  key={list.id} display="flex" justifyContent="start" alignItems="center" >
                                <ListItem onClick={() => navigate(`/user/${currentUser.uid}/project/${list.id}`)} >
                                    {list.projectName}
                                </ListItem>
                            </Grid>

                         
                      
            
                    )): ''}
				</>

                <DialogDelete onClick={() => {}}/>
			</Grid>
        </div>
    )
}

export default AllProjects