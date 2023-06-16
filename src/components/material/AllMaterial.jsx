import React, { useState } from 'react'
import { useEffect } from 'react'
import { useForm } from "react-hook-form"
import { db } from '../../firebase'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import DialogDeleteMaterial from '../modals/DialogDeleteMaterial'
import EditNestedMaterial from './EditNestedMaterial'
import EditMaterial from './EditMaterial'

// mui
import Button from "@mui/material/Button"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Collapse from '@mui/material/Collapse'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import useUpdateDoc from '../../hooks/useUpdateDoc'



const AllMaterial = ({ material }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState(false)
    const [isConfirmDelete, setIsConfirmDelete] = useState(false)
    const [loading, setIsLoading] = useState(false)
    const [openRowId, setOpenRowId] = useState([])
    const [newFields, setNewFields] = useState([])
    const { updateOnSubmit, isEditMode, setIsEditMode, isInputError } = useUpdateDoc('material')

    let itemsId = ''

    const { handleSubmit, reset, register, setValue, formState: { errors }, unregister } = useForm()

    // isOpen hidden rows
    const handleRows = (items) => () => {
        unregister('product') // otherwise the same product will end up in the next openRowId
        return  openRowId.includes(items.id)
            ? setOpenRowId([])
            : (setOpenRowId(items.id),  setIsEditMode(false))
    }

    //! nästa att göra- delete hela produkten
    
    // delete a product including extraItems
    const handleDeleteFromFb = () => async () => {
        setIsOpen(true)
        setIsLoading(true)

        const ref = doc(db, 'material', openRowId)
		setIsError(null)

        if (loading) {
            return
        }
		setIsConfirmDelete(true)

		try {
			await deleteDoc(ref)
			toast.success('Raderat!')
			setIsOpen(false)
			setIsLoading(false)
			
		} catch(err){
			setIsError(err)
			setIsLoading(false)
		}
    }

    const onUpdateSubmit = async (data) => {
        await updateOnSubmit(data, openRowId)
        reset()
    }

  
    return (
        <Grid xs={12}>
            {isInputError && <p>An isError occoured</p>}

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

                            {!loading && material?.map((items) => (                               
                                <React.Fragment key={items.id}>

                                    <TableRow sx={{ '& > *': { borderBottom: 'unset'}, bgcolor: 'white', border: '1px solid #e0e0e0',  }} >
                                        <TableCell sx={{ cursor: 'pointer' }}>
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
                                            <Collapse in={openRowId.includes(items.id)} timeout="auto" unmountOnExit sx={{ bgcolor: 'white' }}>
                                                
                                                    <TableCell sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0 , borderBottom: 'none'}}>
                                                        <Typography variant="h6" gutterBottom component="div"  pl={3}>
                                                            {!isEditMode ? 'Tillhörande produkter' : 'Redigera'}
                                                        </Typography>

                                                        <TableCell align="right" sx={{ borderBottom: 'unset' }}>
                                                            <Button 
                                                                size="small"
                                                                type='button'
                                                                variant="outlined"
                                                                disableElevation
                                                                sx={{ mr: 1 }}
                                                                onClick={() => setIsEditMode((prev) => !prev)} 
                                                            >   
                                                                {!isEditMode && <ModeEditIcon />}
                                                                {isEditMode 
                                                                    ? 'Avbryt' 
                                                                    : 'Redigera'
                                                                }
                                                            </Button>
                                                        </TableCell>

                                                    </TableCell>
                                                   

                                                    <Table size="small" aria-label="fittings">
                                                        {!isEditMode &&  
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

                                                            {isEditMode && (
                                                                <EditMaterial 
                                                                    key={items.id}
                                                                    items={items}
                                                                    register={register}
                                                                    errors={errors}
                                                                    onUpdateSubmit={onUpdateSubmit}
                                                                    newFields={newFields}
                                                                    setNewFields={setNewFields}         
                                                                    setValue={setValue}                                                                                                                                                                         

                                                                />
                                                            )}
                                                        
                                                            {Array.isArray(items?.extraItems) && items?.extraItems?.map((item, i) => {
                                                                // save id to be able to update
                                                                itemsId = items.id
                                                                return (
                                                                    !isEditMode 
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
                                                                                items={items}
                                                                                itemIndex={i}
                                                                                register={register}
                                                                                errors={errors}     
                                                                                reset={reset}                                                                                                                                                                         
                                                                            />          
                                                                ) 
                                                            })}  

                                                    </TableBody>
                                                </Table>
                                                <TableRow sx={{ display: 'flex', justifyContent: 'space-between' }}>

                                                    <TableCell sx={{ border: 'unset',  pt: 10, pl: 3 }}>
                                                        <Button 
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{ color: '#ff0000', borderColor: '#ff0000', '&:hover': {color: 'white', backgroundColor: '#ff0000'} }}
                                                            disableElevation
                                                            onClick={() => setIsOpen(true)} 
                                                        >   
                                                            <DeleteForeverIcon  />
                                                            Radera produkt
                                                        </Button>
                                                    </TableCell>

                                                    <TableCell sx={{ border: 'unset',  pt: 10, pl: 3 }}>
                                                        <Button 
                                                            size="small"
                                                            variant="contained"
                                                            type='submit'
                                                            sx={{ backgroundColor: "#68C37C", width: "76px", mr: 1}}
                                                            disableElevation
                                                        >   
                                                            Spara
                                                        </Button>
                                                    </TableCell>

                                                </TableRow>
                                            </Collapse>
                                        </TableCell>                             
                                    </TableRow>
 
                                    {isOpen && (
                                        <DialogDeleteMaterial 
                                            isOpen={isOpen} 
                                            setIsOpen={setIsOpen} 
                                            setIsLoading={setIsLoading}
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