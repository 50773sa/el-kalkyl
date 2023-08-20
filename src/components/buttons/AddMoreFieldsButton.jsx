import { db } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { uuidv4 } from "@firebase/util"
// components
import BaseButton from "./BaseButton"
// mui
import { useTheme } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'


const AddMoreFieldsButton = ({ items }) => {
    const theme = useTheme()

    const handleAddFields = async (data) => { 
        // create an object with empty fields that you can update
        try {
            await updateDoc(doc(db, 'material', items.id), {
                extraItems: [...data.extraItems, { fittings: '', quantity: 1, unit: '', id: uuidv4() }]
            })    
        } catch (err) {
            console.log('Error: ', err)
        }
    }

    return (
        <BaseButton 
            type="button"
            variant="outlined"
            size='small'
            isFullWidth={true}
            sx={{ 
                paddingY: 0,
                color: theme.palette.color.grey.dark,
                border: '2px dashed' + theme.palette.color.grey.light,
                '&:hover': { 
                    backgroundColor: 'transparent' ,
                    border: '2px dashed' + theme.palette.color.grey.dark,
                },
            }}
            onClick={() => handleAddFields(items)}
            title={<AddRoundedIcon fontSize='large' />}
        />
    )
}

export default AddMoreFieldsButton