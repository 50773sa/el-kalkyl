import { useNavigate } from 'react-router-dom'
// helpers
import getDate from '../../helpers/getDate'
// mui
import { useTheme } from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

const TableRowData = ({ openRowId, setOpenRowId, currentUser, list }) => {
    const theme = useTheme()
    const navigate = useNavigate()

    return (
        <TableRow sx={{ bgcolor: 'white' }}>
            
            <TableCell sx={{ borderLeft: theme.border, borderBottom: openRowId.includes(list.id) && 'none' }}>
                <IconButton
                    aria-label="expand row"
                    size="small" 
                    onClick={() => setOpenRowId(openRowId.includes(list.id) 
                        ? openRowId.filter(id => id !== list.id) 
                        : [...openRowId, list.id]
                    )}
                >
                    {openRowId.includes(list.id) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
        
            <TableCell 
                component="th" 
                scope="row"
                sx={{ borderBottom: openRowId.includes(list.id) && 'none' }}
                onClick={() => navigate(`/user/${currentUser.uid}/project/${list.id}`)} 
            >
                {list.projectName}
            </TableCell>

            <TableCell 
                align="left"
                sx={{ borderBottom: openRowId.includes(list.id) && 'none' }}
                onClick={() => navigate(`/user/${currentUser.uid}/project/${list.id}`)} 
            >
                <em>{getDate(list.created)}</em>
            </TableCell>

            <TableCell 
                align='right'
                sx={{ borderBottom: openRowId.includes(list.id) && 'none', borderRight: theme.border }}                                            
                onClick={() => navigate(`/user/${currentUser.uid}/project/${list.id}`)}
            >
                {list.completed 
                    ? <CircleIcon sx={{ color: theme.palette.color.green.main, cursor: 'default' }}/>
                    : <CircleIcon sx={{ color: theme.palette.color.orange.main, cursor: 'default' }}/>
                }
            </TableCell>
        
        </TableRow>
    )
}

export default TableRowData