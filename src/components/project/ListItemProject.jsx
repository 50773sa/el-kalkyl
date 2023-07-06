import { db } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
// mui
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper'
import TabPanel from '@mui/lab/TabPanel'
import Typography from '@mui/material/Typography'

const ListItemProject = ({ value, selectedProduct, setSelectedProduct, addToDocProducts, setAddToDocProducts, projectId, currentProject, material }) => {

   //Delete object from Firestore
   const handleDeleteFromFb = async (item) => {

        if (addToDocProducts?.some(prod => prod.id === item.id)) {
            try {
                await updateDoc(doc(db, 'projects', projectId), {
                    projectMaterial: currentProject.projectMaterial.filter(pm => pm.id !== item.id)
                })
                setAddToDocProducts(addToDocProducts.filter(product => product.id !== item.id))

            } catch (err) {
                console.log('err', err)
            }
        } 
    }

    const handleAdd = (item) => () => {
        handleDeleteFromFb(item)
        item.quantity = 1

        if (selectedProduct?.includes(item) || addToDocProducts?.some(prod => prod.id === item.id)) {
            setSelectedProduct(selectedProduct.filter(selected => selected !== item))
            setAddToDocProducts(addToDocProducts.filter(product => product.id !== item.id))

        } else {
            setSelectedProduct(selectedProduct => [...selectedProduct, item])
        }
    
        addToDocProducts?.some(prod => prod.id === item.id)
            ?   setAddToDocProducts(addToDocProducts.filter(product => product.id !== item.id))
            :   setAddToDocProducts(addToDocProducts => [...addToDocProducts, item])   
    }


    return (
        <TabPanel value={value} sx={{ px: 0, pt: 0, overflow: 'auto' }} className='tabPanel'>                        
            <Paper sx={{ width: '100%', height: {xs: 250, md: 350}, overflow: 'auto'}}>
                <List component="div" role="list">
                    {material ? material.filter(list => list.category === value).sort((a, b) => a > b ? 1 : -1).map((item, i) => {
                        return (
                            <ListItem 
                                key={item.id} 
                                value={value.i}
                                name="project"
                                onClick={handleAdd(item)}
                                disableGutters
                                sx={{ cursor: 'pointer', px: 4, py: 2 }}
                                className={i % 2 === 0 ? 'even' : ''}
                            > 
                                {selectedProduct?.includes(item) || addToDocProducts?.some(prod => prod.id === item.id)
                                    ?   <CheckBoxOutlinedIcon sx={{ pr: 2 }} />
                                    :   <CheckBoxOutlineBlankOutlinedIcon sx={{ pr: 2 }} />
                                }
                                {item.product}
                            </ListItem>
                        )
                    
                    }): (
                            <Typography sx={{ fontSize: '1rem', m: 2 }}>
                                <em>Inga sparade produkter</em>
                            </Typography>
                        )
                    }
                </List>
            </Paper>
        </TabPanel> 
    )
}

export default ListItemProject