import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import { Trans, useTranslation } from 'react-i18next'
// helpers
import calculateWorkHours from '../helpers/calculateWorkHours'
import getDate from '../helpers/getDate'
// mui
import { styled, useTheme } from '@mui/material/styles'
import CircleIcon from '@mui/icons-material/Circle';
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#E6EEF6',
        color: '#000000',
        fontSize: 16,
        cursor: 'default',
        whiteSpace: 'noWrap'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        whiteSpace: 'noWrap'
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

const HomeTable = ({ projects }) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const { currentUser } = useAuthContext()
    const navigate = useNavigate()
    const title = ['projects', 'created', 'workHours', 'active']

    // Table head
    const tHeadTitle = (title) => (
        t(`homepageTable.head.${title}`)
    )


    return (
        <TableContainer sx={{  boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.25)"}}>
            <Table aria-label="table">
                <TableHead sx={{ cursor: 'default'}}>
                    <TableRow>
                        {title.map((t, i) => (
                            <StyledTableCell key={i} align={ i === 0 ? 'left' : 'right' }>                          
                                {tHeadTitle(t)}
                            </StyledTableCell>
                        ))}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects && projects?.map((row) => {
                        let { hours, minutes } = calculateWorkHours(row)
                        
                        return (
                            <StyledTableRows 
                                key={row.projectName}  
                                sx={{ cursor: 'pointer' }}
                                onClick={() => navigate(`/user/${currentUser.uid}/project/${row.id}`)} 
                            >
                                <StyledTableCell component="th" scope="row">
                                    {row.projectName}
                                </StyledTableCell>
                        
                                <StyledTableCell align="right">{getDate(row.created)}</StyledTableCell>
                                <StyledTableCell align="right">{hours} tim {' '} {minutes} {' '} min</StyledTableCell>

                                <StyledTableCell align="right"> 
                                    {row.completed 
                                        ? <CircleIcon sx={{ color: theme.palette.color.green.main }}/>
                                        : <CircleIcon sx={{ color: theme.palette.color.orange.main }}/>
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

export default HomeTable