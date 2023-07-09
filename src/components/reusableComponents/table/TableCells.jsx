// mui
import TableCell from '@mui/material/TableCell'

const TableCells = ({ width, align, title }) => {
    return (
        <TableCell 
            sx={{ 
                width: {width},
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