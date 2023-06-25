import TableCell from '@mui/material/TableCell'

const TableCells = ({ align, title }) => {
    return (
        <TableCell 
            sx={{ 
                fontWeight: 600, 
                color: '#7b7b7b', 
                py: 1.5 
            }} 
            align={align}
        > {title}
        </TableCell>
    )
}

export default TableCells