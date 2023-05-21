import { db } from '../../firebase'
import { doc,  updateDoc } from 'firebase/firestore'
import useStreamCollection from '../../hooks/useStreamCollection'
// mui
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import TabPanel from '@mui/lab/TabPanel'
import { useEffect, useState } from 'react'


const ListItemProject = ({ value, selectedProduct, setSelectedProduct, addToDocProducts, setAddToDocProducts, projectId, currentProject }) => {
    const [loading, setLoading] = useState(true)

    const { data: material, loading: isStreaming} = useStreamCollection('material')

  
    // console.log('currentProject', currentProject)
    // toggle stored product from firestore

   //Delete object from Firestore
   const handleDeleteFromFb = async (item) => {
        // setLoading(true)

        if (addToDocProducts?.some(prod => prod.id === item.id)) {
            await updateDoc(doc(db, 'projects', projectId), {
                projectMaterial: currentProject.projectMaterial.filter(pm => pm.id !== item.id)
            })
            setAddToDocProducts(addToDocProducts.filter(product => product.id !== item.id))
        } 

        // setLoading(false)

    }

    // add to selectedProduct list
    // const handleAdd = (item) => () => {
    //     console.log('item', item)

    //         selectedProduct?.includes(item) || addToDocProducts?.some(prod => prod.id === item.id)
    //             ?   setSelectedProduct(selectedProduct.filter(selected => selected !== item)) 
    //             :   setSelectedProduct(selectedProduct => [...selectedProduct, item]) 
                    
    //         addToDocProducts?.some(prod => prod.id === item.id)
    //             ?   setAddToDocProducts(addToDocProducts.filter(product => product.id !== item.id))
    //             :   setAddToDocProducts(addToDocProducts => [...addToDocProducts, item])   
                
    // }

    const handleAdd = (item) => () => {
        console.log('click')
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
        <TabPanel value={value} sx={{ height: '300px', padding: '1rem 0', overflowY: 'scroll', boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)" }}  className='tabPanel'>                        
            <List sx={{ overflowY: 'scroll'}}>
                {!isStreaming ? material?.filter(list => list.category === value).map((item, i) => {
                    return (
                        <ListItem 
                            key={item.id} 
                            value={value.i}
                            name="project"
                            onClick={(handleAdd(item))}
                            disableGutters
                            sx={{ cursor: 'pointer', padding: '0.75rem' }}
                            className={i % 2 === 0 ? 'even' : ''}
                        > 
                            {selectedProduct?.includes(item) || addToDocProducts?.some(prod => prod.id === item.id)
                                ?   <CheckBoxOutlinedIcon sx={{ pr: 2, fontSize: 30 }} />
                                :   <CheckBoxOutlineBlankOutlinedIcon sx={{ pr: 2, fontSize: 30 }} />
                            }
                            {item.product}
                        </ListItem>
                    )
                
                }): ''}
            </List>
        </TabPanel> 
    )
}

export default ListItemProject