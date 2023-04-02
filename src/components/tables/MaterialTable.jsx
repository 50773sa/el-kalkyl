import React from 'react'
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
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'



const MaterialTable = ({
    handleDelete, 
    handleObjectInput, 
    errors, 
    register, 
    fittingsRef, 
    qtyRef, 
    unitRef, 
    extraItems,
    inputError 
}) => {

    const { currentUser } = useAuthContext()
    const navigate = useNavigate()


    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#E6EEF6',
            color: '#000000',

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
                        <StyledTableCell>Tillbehör</StyledTableCell>
                        <StyledTableCell align="right">Antal</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {extraItems && extraItems?.map((row, i) => {
                        console.log('row', row)
                        return (
                            <StyledTableRows 
                                key={row.id}  
                                sx={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/user/${currentUser.uid}/project/${row.id}`)} 
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.fittings}
                                </StyledTableCell>
                        
                                <StyledTableCell align="left">{row.quantity + row.unit}</StyledTableCell>
                                <StyledTableCell align="left"></StyledTableCell>
                                <RemoveCircleOutlineIcon onClick={handleDelete(row)} sx={{ color: "#ff0000" }}/>

                            </StyledTableRows>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MaterialTable