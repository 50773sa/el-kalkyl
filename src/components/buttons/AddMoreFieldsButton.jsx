import { db } from '../../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { uuidv4 } from "@firebase/util"
// components
import ButtonComponent from "../reusableComponents/buttons/BaseButton"
// mui
import AddRoundedIcon from '@mui/icons-material/AddRounded'


const AddMoreFieldsButton = ({ items }) => {

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
        <ButtonComponent 
            type="button"
            variant="outlined"
            size='small'
            isFullWidth={true}
            sx={{ 
                paddingY: 0,
                color: '#808080',
                border: '2px dashed #bebebe' ,
                '&:hover': { 
                    backgroundColor: 'transparent' ,
                    border: '2px dashed #808080',
                },
            }}
            onClick={() => handleAddFields(items)}
            title={<AddRoundedIcon fontSize='large' />}
        />
    )
}

export default AddMoreFieldsButton