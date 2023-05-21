import React, { useState } from 'react'
import { useEffect, useRef } from 'react'
import { useForm } from "react-hook-form"
import { db } from '../../firebase'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'

import LoadingBackdrop from '../LoadingBackdrop'
import { toast } from 'react-toastify'

// mui
import Button from "@mui/material/Button"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

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


const AllMaterial = ({ material }) => {
    const [open, setOpen] = useState(false)
    const [error, setError] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [openRow, setOpenRow] = useState([])
    const [product, setProduct] = useState([])
    const [success, setSuccess] = useState(false)

    const fittingsRef = useRef(null)
    const unitRef = useRef(null)
    const qtyRef = useRef(null)
    const productRef = useRef(null)
    let itemsId = ''
console.log('openRow', openRow)
    const { handleSubmit, reset, register, setValue, formState: { errors }, unregister } = useForm()

    // open hidden rows
    const handleRows = (items) => () => {
        unregister('product')
        return  openRow.includes(items.id)
            ? setOpenRow([])
            : (setOpenRow(items.id),  setEditMode(false))
    }

    const handleDeleteFromFb = (items) => async () => {
        setOpen(true)
        setLoading(true)

        const ref = doc(db, 'material', openRow)// openRow is the id of the material
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

        const onUpdateFittings = async (data) => {
        setError(null)
        console.log('data', data)

        if (!data) {
            return
        }

        try {
            await updateDoc(doc(db, 'material', openRow), {
                // extraItems: {
                    "extraItems.fittings": data.fittings,
                    // quantity: data.current.value,
                    // unit: data.current.value,
                // }
            })


            setSuccess(true)
            toast.success('Sparat!')
            // reset()

        } catch (err) {
            setError(err)
        }

    }

    const onUpdateSubmit = async (data) => {
        setError(null)
        console.log('items',data)

        // if (!data) {
        //     return
        // }
        const ref = doc(db, 'material', openRow)

        try {
            await updateDoc(ref, {
                product: data.product,
                estimatedTime: {
                    hours: data.hours,
                    minutes: data.minutes,
                },
                category: data.category,
                extraItems: data.extraItems
            })

    
            setSuccess(true)
            toast.success('Sparat!')
            // reset()

        } catch (err) {
            setError(err)
            console.error(err)

        }

    }


    useEffect(() => {
       
        const prod = material?.map((m => m?.product))
        setProduct([...prod])
        console.log('itemsId', itemsId)
    }, [material, openRow, editMode, itemsId])

    return (
        <Grid xs={12}>


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
                            {material?.map((items) => (                               

                                <React.Fragment key={items.id}>

                                    <TableRow sx={{ '& > *': { borderBottom: 'unset'}, bgcolor: 'white', border: '1px solid #e0e0e0',  }} >
                                        <TableCell sx={{ cursor: 'pointer' }}>
                                            <IconButton
                                                aria-label="expand row"
                                                size="small" 
                                                onClick={handleRows(items)}
                                            >
                                                {openRow.includes(items.id) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell 
                                            component="th" 
                                            scope="row"
                                            sx={{ cursor: 'pointer' }}
                                            onClick={handleRows(items)}
                                        >
                                            {items.product}
                                        </TableCell>

                                        <TableCell 
                                            align="right"
                                            sx={{ cursor: 'pointer' }}
                                            onClick={handleRows(items)}
                                        >
                                            {items.category}
                                        </TableCell>

                                        <TableCell 
                                            align="right"
                                            sx={{ cursor: 'pointer' }}
                                            onClick={handleRows(items)}
                                        >
                                            {items.estimatedTime.hours/60} tim {items.estimatedTime.minutes} min
                                        </TableCell>                                    
                                    </TableRow>

                                    <TableRow >
                                        <TableCell style={{ paddingBottom: 5, paddingTop: 0 , paddingLeft: 0, paddingRight: 0 }} colSpan={6}>
                                            <Collapse in={openRow.includes(items.id)} timeout="auto" unmountOnExit sx={{ bgcolor: 'white' }}>
                                                
                                                    <TableCell sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0 , borderBottom: 'none'}}>
                                                        <Typography variant="h6" gutterBottom component="div"  pl={3}>
                                                            {!editMode ? 'Tillhörande produkter' : 'Redigera'}
                                                        </Typography>

                                                        <TableCell align="right" sx={{ borderBottom: 'unset'}}>
                                                            <Button 
                                                                size="small"
                                                                type='button'
                                                                variant="outlined"
                                                                sx={{ mr: 3, width: '76px' }}
                                                                disableElevation
                                                                onClick={() => setEditMode((prev) => !prev)} 
                                                            >   
                                                                {editMode ? 'Avbryt' : 'Ändra'}
                                                            </Button>

                                                            <Button 
                                                                size="small"
                                                                variant="contained"
                                                                type='submit'
                                                                sx={{ backgroundColor: "#68C37C", width: "76px"}}
                                                                disableElevation
                                                                // onClick={() => onUpdateSubmit(items)}
                                                            >   
                                                                Spara
                                                            </Button>

                                                            <Button 
                                                                size="small"
                                                                type='submit'
                                                                variant="contained"
                                                                sx={{ backgroundColor: '#ff0000', mr: 1 }}
                                                                disableElevation
                                                                onClick={() => setOpen(true)} 
                                                            >   
                                                                Radera
                                                            </Button>
                                                        </TableCell>
                                                    </TableCell>
                                                   

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
                                                                    key={items.id}
                                                                    items={items}
                                                                    register={register}
                                                                    errors={errors}
                                                                    onUpdateSubmit={onUpdateSubmit}
                                                                    productRef={productRef}
                                                                />
                                                            )}
                                                        
                                                            {Array.isArray(items?.extraItems) && items?.extraItems?.map((item, i) => {
                                                                // save id to be able to update
                                                                itemsId = items.id
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
                                                                                itemIndex={i}
                                                                                items={items}
                                                                                register={register}
                                                                                errors={errors}
                                                                                fittingsRef={fittingsRef}
                                                                                qtyRef={qtyRef}
                                                                                unitRef={unitRef}
                                                                                setValue={setValue}
                                                                                onUpdateFittings={onUpdateFittings}
                                                                            />

                                                                    
                                                                ) 
                                                            })}                                                      
                                                    </TableBody>

                                                    </Table>
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