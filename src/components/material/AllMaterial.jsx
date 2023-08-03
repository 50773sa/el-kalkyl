import React, { useState } from 'react'
import { useForm } from "react-hook-form"
// components
import AddMoreFieldsButton from '../buttons/AddMoreFieldsButton'
import DialogDeleteMaterial from '../modals/DialogDeleteMaterial'
import EditNestedMaterial from './edit/EditNestedMaterial'
import EditMaterial from './edit/EditMaterial'
import TableHeader from '../reusableComponents/table/TableHeader'
import TableCells from '../reusableComponents/table/TableCells'
import TableRowItem from './read/TableRowItem'
import TableRowSubtitle from './read/TableRowSubtitle'
// hooks
import useUpdateDoc from '../../hooks/useUpdateDoc'
import useDeleteDocument from '../../hooks/useDeleteDocument'
// mui
import { useTheme } from '@mui/material'
import Button from "@mui/material/Button"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Collapse from '@mui/material/Collapse'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'


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
                            <TableCells title="Produkt" />
                            <TableCells align="right" title="Kategori" />
                            <TableCells align="right" title="Estimerad tid" />
                        </TableHeader>

                        <TableBody>
                            {!isLoading && material?.map((items) => {
                                items = items
                                return (                               
                                    <React.Fragment key={items.id}>
                                        
                                        <TableRowItem 
                                            items={items} 
                                            openRowId={openRowId} 
                                            handleRows={handleRows}
                                        />

                                        {/**
                                         *  Hidden data
                                        */}

                                        <TableRow sx={{ bgcolor: 'white' }}>
                                            <TableCell sx={{ padding: '0 0 5px' }} colSpan={12}>
                                                <Collapse in={openRowId.includes(items.id)} timeout="auto" unmountOnExit sx={{ bgcolor: 'white', borderLeft: theme.border, borderRight: theme.border }}>
                                                    
                                                    <TableRowSubtitle 
                                                        isEditMode={isEditMode} 
                                                        setIsEditMode={setIsEditMode} 
                                                    />
                                                    
                                                    <Table size="small" aria-label="fittings" sx={{ borderBottom: theme.border }}>
                                                        {!isEditMode &&  
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell sx={{ fontWeight: 'bold'}}>Tillbehör</TableCell>
                                                                    <TableCell sx={{ fontWeight: 'bold'}}>Antal</TableCell>
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