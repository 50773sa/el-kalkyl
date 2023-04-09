import useStreamCollection from '../../hooks/useStreamCollection'

import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import TabPanel from '@mui/lab/TabPanel'


const ListItemProject = ({ value, selectedProduct, setSelectedProduct }) => {
    const { data: material, loading: isStreaming} = useStreamCollection('material', 'Apparater')

    // add to selectedProduct list
    const handleAdd = (item) => () => {
        selectedProduct.includes(item)
            ?   setSelectedProduct(selectedProduct.filter(selected => selected !== item))
            :   setSelectedProduct(selectedProduct => [...selectedProduct, item])
    }

    return (
        <TabPanel value={value} sx={{ height: '200px', padding: '1rem 0', overflowY: 'scroll', boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)" }}  className='tabPanel'>                        
            <List sx={{ overflowY: 'scroll'}}>
                {!isStreaming ? material?.filter(list => list.category === value).map((item, i) => {
                    return (
                        <ListItem 
                            key={i} 
                            value={value}
                            name="project"
                            onClick={handleAdd(item)}
                            disableGutters
                            sx={{ cursor: 'pointer', padding: '0.75rem' }}
                            className={i % 2 === 0 ? 'even' : ''}
                        > 
                            {selectedProduct.includes(item) 
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