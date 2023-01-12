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
import CircleIcon from '@mui/icons-material/Circle';
import getDate from './helpers/getDate'




const AllProjects = () => {
    const navigate = useNavigate()
    const [done, setDone] = useState(false)

    const { currentUser } = useAuthContext()
    const { data: projects, loading} = useStreamCollection('projects')
    console.log('projects.', projects?.map(i => i.created))


//   const g = projects?.map(i => i.created?.map(i => i.seconds))
//   console.log('***', getDate(g))

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
                        <Grid 
                            container
                            xs={12}
                            key={list.id} 
                            sx={{ borderBottom: '1px solid #d5caca', margin: '0', cursor: 'pointer'}}
                            onClick={() => navigate(`/user/${currentUser.uid}/project/${list.id}`)} 
                        >
                            <Grid xs={7}>{list.projectName}</Grid>
                            <Grid xs={3} sx={{ color: '#5a5454'}}><em>{getDate(list.created)}</em></Grid>

                            <Grid xs={2} display="flex" justifyContent="end" alignItems="center">
                                { done 
                                    ? <CircleIcon sx={{ color: '#15a715' }}/>
                                    : <CircleIcon sx={{ color: '#ff7000' }}/>
                                }
                            </Grid>
                        </Grid>

                         
                      
            
                    )): ''}
				</>

                <DialogDelete onClick={() => {}}/>
			</Grid>
        </div>
    )
}

export default AllProjects