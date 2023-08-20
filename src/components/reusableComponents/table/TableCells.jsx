// mui
import TableCell from '@mui/material/TableCell'

const TableCells = ({ align, title }) => {
    return (
        <TableCell 
            sx={{ 
                fontWeight: 600, 
                py: 1.5,
                color: '#606060', 
            }} 
            align={align}
        > {title}
        </TableCell>
    )
}

export default TableCells