import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from "react-hook-form"

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
import EditNestedMaterial from './EditNestedMaterial'
import EditMaterial from './EditMaterial'


const AllMaterial = () => {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const [loading, setLoading] = useState(false)
    const [openRows, setOpenRows] = useState([])
    const [product, setProduct] = useState([])
    const { data: material, isLoading } = useGetAuthColl('material')
    const { handleSubmit, reset, register, formState: { errors }, unregister } = useForm()


    const handleEditIcon = (items) => () => {
        setEditMode((prev) => !prev)

        setOpenRows(openRows.includes(items.id) 
            ? openRows.filter(id => id !== items.id) 
            : [...openRows, items.id]
        )
    }

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

    const onUpdateSubmit = () => {

    }


    useEffect(() => {
        if (isLoading) {
            return
        }
        const prod = material?.map((m => m?.product))
        return setProduct([...prod])
    }, [])

    return (
        <Grid xs={12}>

            {isLoading && <LoadingBackdrop />}

            {/**
             *  List of saved products
             */}
            <form onSubmit={handleSubmit(onUpdateSubmit)} noValidate>

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
                            {material && material?.map((items) => (
                                <React.Fragment key={items.id}>

                                    <TableRow sx={{ '& > *': { borderBottom: 'unset'}, bgcolor: 'white', border: '1px solid #e0e0e0',  }} >
                                        <TableCell sx={{ cursor: 'pointer' }}>
                                            <IconButton
                                                aria-label="expand row"
                                                size="small" 
                                                onClick={() => setOpenRows(openRows.includes(items.id) 
                                                    ? openRows.filter(id => id !== items.id) 
                                                    : [...openRows, items.id]
                                                )}
                                            >
                                                {openRows.includes(items.id) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell 
                                            component="th" 
                                            scope="row"
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() => setOpenRows(openRows.includes(items.id) 
                                                ? openRows.filter(id => id !== items.id) 
                                                : [...openRows, items.id]
                                            )}
                                        >
                                            {items.product}
                                        </TableCell>

                                        <TableCell 
                                            align="right"
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() => setOpenRows(openRows.includes(items.id) 
                                                ? openRows.filter(id => id !== items.id) 
                                                : [...openRows, items.id]
                                            )}
                                        >
                                            {items.category}
                                        </TableCell>

                                        <TableCell 
                                            align="right"
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() => setOpenRows(openRows.includes(items.id) 
                                                ? openRows.filter(id => id !== items.id) 
                                                : [...openRows, items.id]
                                            )}
                                        >
                                            {items.estimatedTime.hours} tim {items.estimatedTime.minutes} min
                                        </TableCell>

                                        <TableCell></TableCell>

                                        <TableCell align="right">
                                            <IconButton sx={{ marginRight: 3, display: { xs: 'none', md: 'inline-flex'} }} onClick={handleEditIcon(items)} >
                                                <ModeEditOutlineOutlinedIcon />
                                            </IconButton>
                                            <IconButton onClick={() => setOpen(true)} >
                                                <RemoveCircleOutlineOutlinedIcon />
                                            </IconButton>
                                        </TableCell>
                                    
                                    </TableRow>
                                    <TableRow >
                                        <TableCell style={{ paddingBottom: 5, paddingTop: 0 , paddingLeft: 0, paddingRight: 0 }} colSpan={6}>
                                            <Collapse in={openRows.includes(items.id)} timeout="auto" unmountOnExit sx={{ bgcolor: 'white' }}>
                                                <Box sx={{ p: 2 }} >
                                                    <Typography variant="h6" gutterBottom component="div" pb={1} pl={3}>
                                                        {!editMode ? 'Tillhörande produkter' : 'Redigera'}
                                                    </Typography>

                                                    <Table size="small" aria-label="fittings">
                                                        {!editMode &&  
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Tillbehör</TableCell>
                                                                    <TableCell>Antal</TableCell>
                                                                    <TableCell align="left">Enhet</TableCell>
                                                                    <TableCell align="right">Id</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                        }

                                                        <TableBody >
                                                            {editMode && (
                                                                <EditMaterial 
                                                                    items={items}
                                                                    register={register}
                                                                    errors={errors}
                                                                />
                                                            )}
                                                        
                                                            {items.extraItems.map((item) => {
                                                                return (
                                                                    !editMode 
                                                                        ?   <TableRow key={item.id} >
                                                                                <TableCell component="th" scope="row">
                                                                                    {item.fittings}
                                                                                </TableCell>
                                                                                <TableCell>{item.quantity}</TableCell>
                                                                                <TableCell align="left">{item.unit}</TableCell>
                                                                                <TableCell align="right">{item.id}</TableCell>
                                                                            </TableRow>
                                                                    
                                                                    
                                                                        :   <EditNestedMaterial 
                                                                                key={item.id}
                                                                                item={item}
                                                                                register={register}
                                                                                errors={errors}
                                                                            />

                                                                    
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
                                            handleDeleteFromFb={handleDeleteFromFb(items)}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                       
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
        </Grid>    
    )
}

export default AllMaterial