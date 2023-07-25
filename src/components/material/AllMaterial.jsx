import React, { useState } from 'react'
import { useForm } from "react-hook-form"
// components
import AddMoreFieldsButton from '../buttons/AddMoreFieldsButton'
import DialogDeleteMaterial from '../modals/DialogDeleteMaterial'
import EditNestedMaterial from './childComponents/EditNestedMaterial'
import EditMaterial from './childComponents/EditMaterial'
import TableHeader from '../reusableComponents/table/TableHeader'
import TableCells from '../reusableComponents/table/TableCells'
// hooks
import useUpdateDoc from '../../hooks/useUpdateDoc'
import useDeleteDocument from '../../hooks/useDeleteDocument'
// mui
import { useTheme } from '@mui/material'
import Box from '@mui/material/Box'
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
    const theme = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [openRowId, setOpenRowId] = useState([])
    const [newFields, setNewFields] = useState([])
    const { updateOnSubmit, isEditMode, setIsEditMode, isInputError } = useUpdateDoc('material')
    const { deleteDocFromFirestore } = useDeleteDocument('material')
    let items;

    const { handleSubmit, reset, register, formState: { errors }, unregister, setValue } = useForm()

    const handleRows = (items) => () => {
        unregister('product') // otherwise the same product will end up in the next openRowId
        unregister('extraItems') 

        return openRowId.includes(items.id)
            ? setOpenRowId([])
            : (setOpenRowId(items.id), setIsEditMode(false))
    }
    
    // delete a product including extraItems
    const handleDeleteFromFb = () => async () => {
        await deleteDocFromFirestore(openRowId)
        setIsOpen(false)
    }

    const onUpdateSubmit = async (data) => {
        await updateOnSubmit(data, openRowId, items)
        reset()
    }

    return (
        <Grid xs={12}>
            {isInputError && <p>An error occoured</p>}

            {/**
             *  List of saved products
             */}

            <form onSubmit={handleSubmit(onUpdateSubmit)} noValidate>
                <TableContainer>
                    <Table aria-label="collapsible table">
                        
                        <TableHeader>
                            <TableCells />
                            <TableCells title="Product" />
                            <TableCells align="right" title="Kategori" />
                            <TableCells align="right" title="Estimerad tid" />
                        </TableHeader>

                        <TableBody>
                            {!isLoading && material?.map((items) => {
                                items = items
                                return (                               
                                    <React.Fragment key={items.id}>
                                        <TableRow key={items.id} sx={{ bgcolor: 'white' }}>
                                            <TableCell sx={{ cursor: 'pointer', borderLeft: theme.border, borderBottom: openRowId.includes(items.id) && 'none' }}>
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
                                                sx={{ cursor: 'pointer', borderBottom: openRowId.includes(items.id) && 'none', borderRight: theme.border }}                                            
                                                onClick={handleRows(items)}
                                            >
                                                {items.estimatedTime.hours/60} tim {items.estimatedTime.minutes} min
                                            </TableCell>                                    
                                        </TableRow>

                                        <TableRow sx={{ bgcolor: 'white' }}>
                                            <TableCell sx={{ padding: '0 0 5px' }} colSpan={12}>
                                                <Collapse in={openRowId.includes(items.id)} timeout="auto" unmountOnExit sx={{ bgcolor: 'white', borderLeft: theme.border, borderRight: theme.border  }}>
                                                    
                                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                                                        <Typography variant="h6" gutterBottom component="div">
                                                            {!isEditMode ? 'Tillhörande produkter' : 'Redigera'}
                                                        </Typography>

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
                                                    </Box>
                                                    
                                                    <Table size="small" aria-label="fittings" sx={{ borderBottom: theme.border }}>
                                                        {!isEditMode &&  
                                                            <TableHead>
                                                                <TableRow sx={{ fontWeight: 'bold'}} >
                                                                    <TableCell  sx={{ fontWeight: 'bold'}} >Tillbehör</TableCell>
                                                                    <TableCell  sx={{ fontWeight: 'bold'}} >Antal</TableCell>
                                                                    <TableCell align="left"  sx={{ fontWeight: 'bold'}} >Enhet</TableCell>
                                                                    <TableCell align="right"  sx={{ fontWeight: 'bold'}} >Id</TableCell>
                                                                </TableRow>
                                                            </TableHead>
                                                        }

                                                        <TableBody>
                                                            {isEditMode && items !== undefined && (
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
                                                                        ?   <TableRow key={item.id}>
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

                                                            {/**
                                                            *  Add more newFields button
                                                            */}

                                                            <TableRow sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(12, 1fr)' }, ml: 2.5, mr: 2}}>
                                                                <TableCell sx={{ borderBottom: 'none', gridColumn: { xs: 'span 3', sm: 'span 6', md: 'span 11' } }}>
                                                                    {isEditMode && (
                                                                        <AddMoreFieldsButton items={items} />
                                                                    )}  
                                                                </TableCell>
                                                                <TableCell sx={{ borderBottom: 'none' }} />
                                                                <TableCell sx={{ borderBottom: 'none' }} />
                                                                <TableCell sx={{ borderBottom: 'none' }} />
                                                            </TableRow>


                                                            <TableRow sx={{ display: 'grid', gridTemplateColumns: '6fr 6fr' }}>
                                                                <TableCell sx={{ pt: 10, p: '4rem 1rem 2rem', border: 'none' }}>
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

                                                                {isEditMode && (
                                                                    <TableCell sx={{ pt: 10, pl: 3, p: '4rem 1rem 2rem' }} align='right'>
                                                                        <Button 
                                                                            size="small"
                                                                            variant="contained"
                                                                            type='submit'
                                                                            sx={{ backgroundColor: "#68C37C", width: "76px" }}
                                                                            disableElevation
                                                                        >   
                                                                            Spara
                                                                        </Button>
                                                                    </TableCell>
                                                                )}
                                                            </TableRow>

                                                        </TableBody>
                                                    </Table>

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
                                )                    
                            })}
                       
                        </TableBody>
                    </Table>
                </TableContainer>
            </form>
        </Grid>    
    )
}

export default AllMaterial