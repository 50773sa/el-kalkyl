// mui
import { useTheme } from "@mui/material"
import { styled } from '@mui/material/styles'
import Collapse from '@mui/material/Collapse'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const StyledTableCellBold = styled(TableCell)(() => ({
	fontWeight: 'bold',
    cursor: 'default'
}))

const StyledTCellCursorDefault = styled(TableCell)(() => ({
    cursor: 'default'
}))


const CollapseTableRowData = ({ openRowId, list }) => {
    const theme = useTheme()

    return (
        <Collapse 
            in={openRowId.includes(list.id)} 
            timeout="auto" 
            unmountOnExit 
            sx={{ 
                borderLeft: theme.border, 
                borderRight: theme.border, 
                bgcolor: 'white' 
            }}
        >
            <Table size="small" aria-label="fittings">

                <TableHead>
                    <TableRow>
                        <StyledTableCellBold>Produkter</StyledTableCellBold>
                        <StyledTableCellBold>Antal</StyledTableCellBold>
                        <StyledTableCellBold />
                        <StyledTableCellBold align='right'>Artikelnummer</StyledTableCellBold>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {list.projectMaterial.map((list) => (                                                                 
                        <TableRow key={list.id}>   
                            <StyledTCellCursorDefault>{list.product}</StyledTCellCursorDefault>
                            <StyledTCellCursorDefault>{list.quantity}</StyledTCellCursorDefault>   
                            <StyledTCellCursorDefault />   
                            <StyledTCellCursorDefault align="right">{list.id}</StyledTCellCursorDefault>   
                        </TableRow>
                    ))}  
                </TableBody>   
                                                                       
            </Table>
        </Collapse>
    )
}

export default CollapseTableRowData