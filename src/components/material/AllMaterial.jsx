import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
// components
import DialogDeleteMaterial from '../modals/DialogDeleteMaterial'
import EditNestedMaterial from './edit/EditNestedMaterial'
import EditMaterial from './edit/EditMaterial'
import TableHeader from '../reusableComponents/table/TableHeader'
import TableCells from '../reusableComponents/table/TableCells'
// hooks
import useUpdateDoc from '../../hooks/useUpdateDoc'
import useDeleteDocument from '../../hooks/useDeleteDocument'
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


const AllMaterial = ({ material }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [openRowId, setOpenRowId] = useState([])
    const [newFields, setNewFields] = useState([])
    const { updateOnSubmit, isEditMode, setIsEditMode, isInputError } = useUpdateDoc('material')
    const { deleteDocFromFirestore } = useDeleteDocument('material')

    const { handleSubmit, reset, register, setValue, formState: { errors }, unregister } = useForm()

    // isOpen hidden rows
    const handleRows = (items) => () => {
        unregister('product') // otherwise the same product will end up in the next openRowId
        unregister('extraItems') 

        return  openRowId.includes(items.id)
            ? setOpenRowId([])
            : (
                setOpenRowId(items.id), 
                setIsEditMode(false)
            )
    }
    
    // delete a product including extraItems
    const handleDeleteFromFb = () => async () => {
        await deleteDocFromFirestore(openRowId)
        setIsOpen(false)
    }

    const onUpdateSubmit = async (data) => {
        await updateOnSubmit(data, openRowId)
        reset()
    }

    useEffect(() => {

    }, [openRowId])

    return (
        <Grid xs={12}>
            {isInputError && <p>An error occoured</p>}

            {/**
             *  List of saved products
             */}

            <form onSubmit={handleSubmit(onUpdateSubmit)} noValidate>
                <TableContainer >
                    <Table aria-label="collapsible table">
                        <TableHeader>
                            <TableCells />
                            <TableCells title="Product" />
                            <TableCells align="right" title="Kategori" />
                            <TableCells align="right" title="Estimerad tid" />
                        </TableHeader>

                        <TableBody>

                            {!isLoading && material?.map((items) => (                               
                                <React.Fragment key={items.id}>
                                    <TableRow sx={{ '& > *': { borderBottom: 'unset'}, bgcolor: 'white'}} >
                                        <TableCell sx={{ cursor: 'pointer', borderBottom: openRowId.includes(items.id) && 'none' }}>
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
                                            sx={{ cursor: 'pointer', borderBottom: openRowId.includes(items.id) && 'none' }}
                                            onClick={handleRows(items)}
                                        >
                                            {items.product}
                                        </TableCell>

                                        <TableCell 
                                            align="right"
                                            sx={{ cursor: 'pointer', borderBottom: openRowId.includes(items.id) && 'none' }}                                           
                                            onClick={handleRows(items)}
                                        >
                                            {items.category}
                                        </TableCell>

                                        <TableCell 
                                            align="right"
                                            sx={{ cursor: 'pointer', borderBottom: openRowId.includes(items.id) && 'none' }}                                            
                                            onClick={handleRows(items)}
                                        >
                                            {items.estimatedTime.hours/60} tim {items.estimatedTime.minutes} min
                                        </TableCell>                                    
                                    </TableRow>

                                    <TableRow sx={{ '& > *': { borderBottom: 'unset'}, bgcolor: 'white'}} >
                                        <TableCell sx={{ padding: '0 0 5px ' }} colSpan={6}>
                                            <Collapse in={openRowId.includes(items.id)} timeout="auto" unmountOnExit sx={{ bgcolor: 'white' }}>
                                                
                                                    <TableCell sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 0 , borderBottom: 'none'}}>
                                                        <Typography variant="h6" gutterBottom component="div"  pl={2}>
                                                            {!isEditMode ? 'Tillhörande produkter' : 'Redigera'}
                                                        </Typography>

                                                        <TableCell align="right" sx={{ borderBottom: 'unset' }}>
                                                            <Button 
                                                                size="small"
                                                                type='button'
                                                                variant="text"
                                                                disableElevation
                                                                onClick={() => setIsEditMode((prev) => !prev)} 
                                                                sx={{ textDecorationLine: 'underline' }} 
                                                            >   
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

                                                <TableRow sx={{ display: 'grid', gridTemplateColumns: '6fr 6fr'}}>
                                                    <TableCell sx={{ pt: 10 }}>
                                                        <Button 
                                                            size="small"
                                                            variant="outlined"
                                                            sx={{ color: '#ff0000', borderColor: '#ff0000', '&:hover': {color: 'white',  borderColor: '#ff0000', backgroundColor: '#ff0000'} }}
                                                            disableElevation
                                                            onClick={() => setIsOpen(true)} 
                                                        >   
                                                            Radera produkt
                                                        </Button>
                                                    </TableCell>

                                                    <TableCell sx={{ pt: 10, pl: 3 }} align='right'>
                                                        {isEditMode && (
                                                            <Button 
                                                                 size="small"
                                                                 variant="contained"
                                                                 type='submit'
                                                                 sx={{ backgroundColor: "#68C37C", width: "76px" }}
                                                                 disableElevation
                                                             >   
                                                                 Spara
                                                             </Button>
                                                        )}
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