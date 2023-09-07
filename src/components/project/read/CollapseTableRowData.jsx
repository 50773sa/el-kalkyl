// mui
import { useTheme } from "@mui/material"
import { styled } from '@mui/material/styles'
import Collapse from '@mui/material/Collapse'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useTranslation } from "react-i18next"

const StyledTableCellBold = styled(TableCell)(() => ({
	fontWeight: 'bold',
    cursor: 'default'
}))

const StyledTCellCursorDefault = styled(TableCell)(() => ({
    cursor: 'default'
}))


const CollapseTableRowData = ({ openRowId, list }) => {
    const theme = useTheme()
    const { t } = useTranslation()

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
                        <StyledTableCellBold>{t(`tableHead.product`, 'Product')}</StyledTableCellBold>
                        <StyledTableCellBold>{t(`tableHead.quantity`, 'Quantity')}</StyledTableCellBold>
                        <StyledTableCellBold />
                        <StyledTableCellBold align='right'>{t(`tableHead.articleNumber`, 'Article number')}</StyledTableCellBold>
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