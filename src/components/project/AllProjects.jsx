import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
// components
import CollapseTableRowData from './read/CollapseTableRowData'
import { useAuthContext } from '../../contexts/AuthContextProvider'
import TableCells from '../reusableComponents/table/TableCells'
import TableHeadBase from '../reusableComponents/table/TableHeadBase'
import TableRowData from './read/TableRowData'
// mui
import { useTheme } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'

const AllProjects = ({ projects }) => {
    const [openRowId, setOpenRowId] = useState([])
    const { currentUser } = useAuthContext()
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Grid xs={12}>

            {/**
             * 	List of all projects
             */}

            <TableContainer >
                <Table aria-label="collapsible table">

                    <TableHeadBase>
                        <TableCells />
                        <TableCells title={t(`tableHead.projects`, 'Projects')} />
                        <TableCells align="left" title={t(`tableHead.created`, 'Created')} />
                        <TableCells align="right" title={t(`tableHead.timeEstimate`)}/>
                    </TableHeadBase>

                    <TableBody>
                        {projects?.map((list) => (
                            <React.Fragment key={list.id}>

                                <TableRowData
                                    openRowId={openRowId}
                                    setOpenRowId={setOpenRowId}
                                    list={list}
                                    currentUser={currentUser}
                                />

                                {/**
                                 *  'Hidden' data
                                */}

                                <TableRow sx={{ '&:not(:last-child)': { borderBottom: theme.border } }}>
                                    <TableCell sx={{ cursor: 'default', padding: '0 0 5px',  borderBottom: 'none' }} colSpan={6}>

                                        <CollapseTableRowData 
                                            openRowId={openRowId}
                                            list={list}
                                        />

                                    </TableCell>
                                </TableRow>

                            </React.Fragment>
                        ))}
                    
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}

export default AllProjects