// mui
import { useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

const TableRowItem = ({ items, openRowId, handleRows }) => {
    const theme = useTheme()

    return (
        <TableRow key={items.id} sx={{ bgcolor: 'white' }}>
            <TableCell sx={{ cursor: 'pointer', borderLeft: theme.border, borderBottom: openRowId.includes(items.id) && 'none' }}>
                <IconButton
                    aria-label="expand row"
                    size="small" 
                    onClick={handleRows(items)}
                >
                    {openRowId.includes(items.id) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell 
                component="th" 
                scope="row"
                sx={{ cursor: 'pointer', borderBottom: openRowId.includes(items.id) && 'none' }}
                onClick={handleRows(items)}
            >
                {items.product}
            </TableCell>

            <TableCell 
                align="right"
                sx={{ cursor: 'pointer', borderBottom: openRowId.includes(items.id) && 'none' }}                                           
                onClick={handleRows(items)}
            >
                {items.category}
            </TableCell>

            <TableCell 
                align="right"
                sx={{ cursor: 'pointer', borderBottom: openRowId.includes(items.id) && 'none', borderRight: theme.border }}                                            
                onClick={handleRows(items)}
            >
                {items.estimatedTime.hours/60} tim {items.estimatedTime.minutes} min
            </TableCell>                                    
        </TableRow>
    )
}

export default TableRowItem