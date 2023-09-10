// mui
import { useTheme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useTranslation } from 'react-i18next'

const TableRowItem = ({ items, openRowId, handleRows }) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <TableRow key={items.id} sx={{ bgcolor: 'white' }}>
            <TableCell sx={{ borderLeft: theme.border, borderBottom: openRowId.includes(items.id) && 'none' }}>
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
                sx={{ borderBottom: openRowId.includes(items.id) && 'none' }}
                onClick={handleRows(items)}
            >
                {items.product}
            </TableCell>

            <TableCell 
                align="right"
                sx={{ borderBottom: openRowId.includes(items.id) && 'none' }}                                           
                onClick={handleRows(items)}
            >
                {items.category}
            </TableCell>

            <TableCell 
                align="right"
                sx={{ borderBottom: openRowId.includes(items.id) && 'none', borderRight: theme.border }}                                            
                onClick={handleRows(items)}
            >
                {items.estimatedTime.hours/60 + t(`other.hours`,'h')} {items.estimatedTime.minutes + t(`other.minutes`,' min')}
            </TableCell>                                    
        </TableRow>
    )
}

export default TableRowItem