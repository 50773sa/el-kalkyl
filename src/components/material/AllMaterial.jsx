import React, { useState } from 'react'
import { useForm } from "react-hook-form"
// components
import AddMoreFieldsButton from '../buttons/AddMoreFieldsButton'
import DialogDeleteMaterial from '../modals/DialogDeleteMaterial'
import EditNestedMaterial from './edit/EditNestedMaterial'
import EditMaterial from './edit/EditMaterial'
import TableHeadBase from '../reusableComponents/table/TableHeadBase'
import TableCells from '../reusableComponents/table/TableCells'
import TableRowItem from './read/TableRowItem'
import TableRowSubtitle from './read/TableRowSubtitle'
// hooks
import useUpdateDoc from '../../hooks/useUpdateDoc'
import useDeleteDocument from '../../hooks/useDeleteDocument'
// mui
import { useTheme } from '@mui/material'
import { styled } from '@mui/material/styles'
import Button from "@mui/material/Button"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import Collapse from '@mui/material/Collapse'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const StyledTableCellBold = styled(TableCell)(() => ({
	fontWeight: 'bold',
    cursor: 'default'
}))

const StyledTableCellCursor = styled(TableCell)(() => ({
    cursor: 'default'
}))


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
                        
                        <TableHeadBase>
                            <TableCells />
                            <TableCells title="Produkt" />
                            <TableCells align="right" title="Kategori" />
                            <TableCells align="right" title="Estimerad tid" />
                        </TableHeadBase>

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

                                        <TableRow sx={{ '&:not(:last-child)': { borderBottom: theme.border } }}>
                                            <TableCell sx={{ cursor: 'default', padding: '0 0 5px',  borderBottom: 'none' }} colSpan={6}>
                                                <Collapse in={openRowId.includes(items.id)} timeout="auto" unmountOnExit sx={{ borderLeft: theme.border, borderRight: theme.border, cursor: 'default', bgcolor: 'white' }}>
                                                    
                                                    <TableRowSubtitle 
                                                        isEditMode={isEditMode} 
                                                        setIsEditMode={setIsEditMode} 
                                                    />
                                                    
                                                    <Table size="small" aria-label="fittings" sx={{ borderBottom: theme.border }}>
                                                        {!isEditMode &&  
                                                            <TableHead>
                                                                <TableRow>
                                                                    <StyledTableCellBold>Tillbehör</StyledTableCellBold>
                                                                    <StyledTableCellBold>Antal</StyledTableCellBold>
                                                                    <StyledTableCellBold align="left">Enhet</StyledTableCellBold>
                                                                    <StyledTableCellBold align="right">Artikelnummer</StyledTableCellBold>
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
                                                                                <StyledTableCellCursor component="th" scope="row">
                                                                                    {item.fittings}
                                                                                </StyledTableCellCursor>
                                                                                <StyledTableCellCursor>{item.quantity}</StyledTableCellCursor>
                                                                                <StyledTableCellCursor align="left">{item.unit}</StyledTableCellCursor>
                                                                                <StyledTableCellCursor align="right">{item.id}</StyledTableCellCursor>
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
                                                            *  Add more fields- button
                                                            */}

                                                            <TableRow>
                                                                <TableCell sx={{ cursor: 'pointer', border: 'none' }} >
                                                                    {isEditMode && (
                                                                        <Grid container spacing={2}>
                                                                            <Grid xs={12} sx={{ mx: 2.5, pr: 0, mt: 3 }}>
                                                                                <AddMoreFieldsButton items={items} />
                                                                            </Grid>
                                                                        </Grid>
                                                                    )}  
                                                                </TableCell>
                                                            </TableRow>

                                                            {/**
                                                             *  Delete/save buttons
                                                             */}

                                                            <TableRow sx={{ display: 'flex', justifyContent: 'space-between', cursor: 'default' }}>
                                                                <TableCell sx={{ pt: 10, p: '4rem 1rem 2rem', border: 'none' }}>
                                                                    <Button 
                                                                        size="small"
                                                                        variant="outlined"
                                                                        sx={{ 
                                                                            color: theme.palette.error.main, 
                                                                            borderColor: theme.palette.error.main, 
                                                                            '&:hover': {
                                                                                color: 'white', 
                                                                                borderColor: theme.palette.error.main, 
                                                                                backgroundColor: theme.palette.error.main,
                                                                            } 
                                                                        }}
                                                                        disableElevation
                                                                        onClick={() => setIsOpen(true)} 
                                                                        
                                                                    >   
                                                                        Radera produkt
                                                                    </Button>
                                                                </TableCell>

                                                                {isEditMode && (
                                                                    <TableCell sx={{ pt: 10, pl: 3, p: '4rem 1rem 2rem', border: 'none' }} align='right'>
                                                                        <Button 
                                                                            size="small"
                                                                            variant="contained"
                                                                            type='submit'
                                                                            sx={{ 
                                                                                backgroundColor: theme.palette.color.green.main, 
                                                                                width: "76px",
                                                                                '&:hover': {
                                                                                    backgroundColor: theme.palette.color.green.hover,
                                                                                } 
                                                                            }}
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