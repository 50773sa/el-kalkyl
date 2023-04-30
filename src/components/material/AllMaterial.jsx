import React, { useState } from 'react'
import { useEffect } from 'react'
import { db } from '../../firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import useGetAuthColl from '../../hooks/useGetAuthColl'
import LoadingBackdrop from '../LoadingBackdrop'
import { toast } from 'react-toastify'

// mui
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import DialogDeleteMaterial from '../modals/DialogDeleteMaterial'


const AllMaterial = () => {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)

    const [loading, setLoading] = useState(false)
    const [openRows, setOpenRows] = useState([])
    const [product, setProduct] = useState([])
    const { data: material, isLoading: isStreaming } = useGetAuthColl('material')


    const handleDeleteFromFb = (selectedItem) => async () => {
        setLoading(true)
     
        const ref = doc(db, 'material', selectedItem.id)

		setError(null)

        if (loading) {
            return
        }
		setConfirmDelete(true)

		try {
			await deleteDoc(ref)
			toast.success('Raderat!')
			setOpen(false)
			setLoading(false)
			
		} catch(err){
			setError(err)
			setLoading(false)
		}
    }


    useEffect(() => {
        if (isStreaming) {
            return
        }
        const prod = material?.map((m => m?.product))
        return setProduct([...prod])
    }, [])

    return (
        <Grid container spacing={2} xs={12}>

            {isStreaming && <LoadingBackdrop />}

            {/**
             *  List of saved products
             */}

            <React.Fragment>
                <TableContainer >
                    <Table aria-label="collapsible table">
                        <TableHead sx={{ marginTop: '2rem'}}>
                            <TableRow >
                                <TableCell />
                                <TableCell sx={{ fontWeight: 'bold' }}>Produkt</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="right">Kategori</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }} align="right">Estimerad tid</TableCell>
                            </TableRow> 
                        </TableHead>

                        <TableBody>
                            <>
                                {!isStreaming && material?.map((item) => (
                                    <React.Fragment key={item.id}>

                                        <TableRow sx={{ border: '1px solid #e0e0e0', bgcolor: 'white',  '& > *': { borderBottom: 'unset' }  }} >
                                            <TableCell sx={{ cursor: 'pointer' }}>
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small" 
                                                    onClick={() => setOpenRows(openRows.includes(item.id) 
                                                        ? openRows.filter(id => id !== item.id) 
                                                        : [...openRows, item.id]
                                                    )}
                                                >
                                                    {openRows.includes(item.id) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell 
                                                component="th" 
                                                scope="row"
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => setOpenRows(openRows.includes(item.id) 
                                                    ? openRows.filter(id => id !== item.id) 
                                                    : [...openRows, item.id]
                                                )}
                                            >
                                                {item.product}
                                            </TableCell>

                                            <TableCell 
                                                align="right"
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => setOpenRows(openRows.includes(item.id) 
                                                    ? openRows.filter(id => id !== item.id) 
                                                    : [...openRows, item.id]
                                                )}
                                            >
                                                {item.category}
                                            </TableCell>

                                            <TableCell 
                                                align="right"
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => setOpenRows(openRows.includes(item.id) 
                                                    ? openRows.filter(id => id !== item.id) 
                                                    : [...openRows, item.id]
                                                )}
                                            >
                                                {item.estimatedTime.hours} tim {item.estimatedTime.minutes}
                                            </TableCell>

                                            <TableCell></TableCell>

                                            <TableCell align="right">
                                                <IconButton sx={{ marginRight: 3}} onClick={() => ''} >
                                                    <ModeEditOutlineOutlinedIcon/>
                                                </IconButton>
                                                <IconButton onClick={() => setOpen(true)} >
                                                    <RemoveCircleOutlineOutlinedIcon />
                                                </IconButton>
                                            </TableCell>
                                        
                                        </TableRow>

                                        <TableRow >
                                            <TableCell style={{ paddingBottom: 5, paddingTop: 0 , paddingLeft: 0, paddingRight: 0 }} colSpan={6}>
                                                <Collapse in={openRows.includes(item.id)} timeout="auto" unmountOnExit sx={{ bgcolor: 'white' }}>
                                                    <Box sx={{ p: 2 }} >
                                                        <Typography variant="h6" gutterBottom component="div">
                                                            Tillhörande produkter
                                                        </Typography>

                                                        <Table size="small" aria-label="fittings">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Tillbehör</TableCell>
                                                                    <TableCell>Antal</TableCell>
                                                                    <TableCell align="right">Enhet</TableCell>
                                                                    <TableCell align="right">Id</TableCell>
                                                                </TableRow>
                                                            </TableHead>

                                                            <TableBody >
                                                                {item.extraItems.map((item) => {
                                                                    return (
                                                                        <TableRow key={item.id} >
                                                                            <TableCell component="th" scope="row">
                                                                                {item.fittings}
                                                                            </TableCell>
                                                                            <TableCell>{item.quantity}</TableCell>
                                                                            <TableCell align="right">{item.unit}</TableCell>
                                                                            <TableCell align="right">{item.id}</TableCell>
                                                                        </TableRow>
                                                                    )
                                                                })}    
                                                            </TableBody>

                                                        </Table>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        
                                        </TableRow>

                                        {open && (
                                            <DialogDeleteMaterial 
                                                open={open} 
                                                setOpen={setOpen} 
                                                setLoading={setLoading}
                                                handleDeleteFromFb={handleDeleteFromFb(item)}
                                            />
                                        )}
                                    </React.Fragment>
                                ))}
                            </>
                       
                        </TableBody>
                    </Table>
                </TableContainer>
            </React.Fragment>
        </Grid>    
    )
}

export default AllMaterial