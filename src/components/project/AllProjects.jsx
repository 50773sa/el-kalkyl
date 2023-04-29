import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import getDate from '../helpers/getDate'
import DialogDeleteMaterial from '../modals/DialogDeleteMaterial'

// mui
import AddIcon from '@mui/icons-material/Add'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box';
import CircleIcon from '@mui/icons-material/Circle'
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button } from '@mui/material'


const AllProjects = ({ projects }) => {
    const [openRows, setOpenRows] = useState([])

    const { currentUser } = useAuthContext()
    const navigate = useNavigate()

    return (
        <div className='wrapper' id='allProjectsWrapper'>
			<Grid container spacing={2}>

				{/**
				 * 	List
				 */}

                <TableContainer >
                    <Table aria-label="collapsible table">
     
                        <TableBody>
                            <TableRow  >
                                <TableCell sx={{ color: 'grey'}}>Aktiv</TableCell>
                                <TableCell sx={{ color: 'grey'}}>Projekt</TableCell>                             
                                <TableCell sx={{ color: 'grey'}}>Datum</TableCell>
                                <TableCell align='right'>
                                    <Button 
                                        sx={{ p: 1.5 }}
                                        variant="contained" 
                                        onClick={() => navigate(`/user/${currentUser.uid}/create-project`)} 
                                    >
                                        <AddIcon />
                                         Nytt projekt  
                                </Button>
                                </TableCell> 
                            </TableRow>
                            <>
                                {projects?.map((list) => (
                                    <React.Fragment key={list.id}>
                                        <TableRow sx={{ '& > *': { borderBottom: 'unset'}, bgcolor: 'white' }} >
                                           
                                        <TableCell onClick={() => navigate(`/user/${currentUser.uid}/project/${list.id}`)} >
                                            {list.completed 
                                                ? <CircleIcon sx={{ color: '#15a715', cursor: 'default' }}/>
                                                : <CircleIcon sx={{ color: '#ff7000', cursor: 'default' }}/>
                                            }
                                        </TableCell>
                                            <TableCell 
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => navigate(`/user/${currentUser.uid}/project/${list.id}`)} 
                                                component="th" 
                                                scope="row"
                                            >
                                                {list.projectName}
                                            </TableCell>

                                            <TableCell 
                                                sx={{ cursor: 'pointer' }}
                                                align="left"
                                                onClick={() => navigate(`/user/${currentUser.uid}/project/${list.id}`)} 
                                            >
                                                <em>{getDate(list.created)}</em>
                                            </TableCell>

                                          

                                             <TableCell align='right' sx={{ cursor: 'pointer' }}>
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small" 
                                                    onClick={() => setOpenRows(openRows.includes(list.id) 
                                                        ? openRows.filter(id => id !== list.id) 
                                                        : [...openRows, list.id]
                                                    )}
                                                >
                                                    {openRows.includes(list.id) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>
                                        
                                        </TableRow>

                                        {/**
                                         *  Hidden data
                                        */}

                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 5, paddingTop: 0 , paddingLeft: 0, paddingRight: 0 }} colSpan={6}>
                                                <Collapse in={openRows.includes(list.id)} timeout="auto" unmountOnExit sx={{ bgcolor: 'white' }}>
                                                    <Box sx={{ p: 2 , display: 'flex', justifyContent: 'end'}} >
                                                        <Grid xs={12} lg={8} display="flex">
                                                            <Table size="small" aria-label="fittings">
                                                                <TableHead>
                                                                    <TableRow>                                                          
                                                                        <TableCell sx={{ fontSize: '16px'}}>Produkt</TableCell>
                                                                        <TableCell align="right" sx={{ fontSize: '16px'}}>Antal</TableCell>
                                                                    </TableRow>
                                                                </TableHead>

                                                                <TableBody >
                                                                    {list.projectMaterial.map((list) => (                                                                 
                                                                        <TableRow key={list.id}>   
                                                                            <TableCell>{list.product}</TableCell>
                                                                            <TableCell align="right" >{list.quantity}</TableCell>                                                                           
                                                                        </TableRow>
                                                                    ))}  
                                                                    
                                                                </TableBody>
                                                            </Table>
                                                        </Grid>
                                                  
                                                    

                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        
                                        </TableRow>

                                      
                                    </React.Fragment>
                                ))}
                            </>
                       
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* {projects ? projects?.map((list) => (
                    <Grid 
                        container
                        xs={12}
                        key={list.id} 
                        display="flex"
                        alignItems="center"
                        sx={{ borderBottom: '1px solid #d5caca', margin: '0', cursor: 'pointer'}}
                        onClick={() => navigate(`/user/${currentUser.uid}/project/${list.id}`)} 
                    >
                        <Grid xs={7}>{list.projectName}</Grid>
                        <Grid xs={3} sx={{ color: '#5a5454'}}><em>{getDate(list.created)}</em></Grid>

                        <Grid xs={2} display="flex" justifyContent="end" alignItems="center">
                            {list.completed 
                                ? <CircleIcon sx={{ color: '#15a715' }}/>
                                : <CircleIcon sx={{ color: '#ff7000' }}/>
                            }
                        </Grid>
                    </Grid>
                )): ''} */}
			</Grid>
        </div>
    )
}

export default AllProjects