import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import calculateWorkHours from '../helpers/calculateWorkHours'
import getDate from '../helpers/getDate'
import CircleIcon from '@mui/icons-material/Circle';

import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const AllProjectsTable = ({ projects }) => {
    const { currentUser } = useAuthContext()
    const navigate = useNavigate()


    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#E6EEF6',
            color: '#000000',
            fontSize: 20,

        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 16,
        },
    }))

      
    const StyledTableRows = styled(TableRow)(({ theme }) => ({
            '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
            // hide last border
            '&:last-child td, &:last-child th': {
                border: 0,
        },
    }))


    return (
        <TableContainer sx={{ mt: '2rem', boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)"}}>
            <Table aria-label="table">
                <TableHead sx={{ cursor: 'default'}}>
                    <TableRow>
                        <StyledTableCell>Pågående projekt</StyledTableCell>
                        <StyledTableCell align="left">Skapad</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right">Avklarad</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects && projects?.map((row, i) => {

                        let { hours, minutes } = calculateWorkHours(row)
                        console.log('minutes', minutes)
                        console.log('row', row.projectMaterial.map(row => row.estimatedTime))



                        return (
                            <StyledTableRows 
                                key={row.projectName}  
                                sx={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/user/${currentUser.uid}/project/${row.id}`)} 
                            >
                                <StyledTableCell component="th" scope="row" sx={{ width: '25rem'}}>
                                    {row.projectName}
                                </StyledTableCell>
                        
                                <StyledTableCell align="left">{getDate(row.created)}</StyledTableCell>
                                <StyledTableCell align="right">{row.completed}</StyledTableCell>
                                {/* <StyledTableCell align="right">{hours} tim {' '} {minutes} {' '} min</StyledTableCell> */}
                                <StyledTableCell align="right"> 
                                    {row.completed 
                                        ? <CircleIcon sx={{ color: '#15a715' }}/>
                                        : <CircleIcon sx={{ color: '#ff7000' }}/>
                                    }                        
                                </StyledTableCell>
                            </StyledTableRows>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AllProjectsTable