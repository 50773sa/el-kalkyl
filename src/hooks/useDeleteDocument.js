import { useState } from 'react'
import { db } from '../firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

const useDeleteDocument = (document) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isConfirmDelete, setIsConfirmDelete] = useState(false)

        // delete a product including extraItems
        const deleteDocFromFirestore = async (openRowId) => {
            setIsOpen(true)
            setIsLoading(true)
    
            const ref = doc(db, document, openRowId)
            setIsError(null)
    
            if (isLoading) {
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

        return {
            deleteDocFromFirestore
        }

}

export default useDeleteDocument