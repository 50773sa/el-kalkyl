import { useState } from 'react'
import { db } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

const useDeleteDocumentField = (document) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isConfirmDelete, setIsConfirmDelete] = useState(false)
    const [isError, setIsError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const deleteDocumentField = async (items, item) => {
        setIsError(null)
        setIsOpen(true)
        setIsLoading(true)

        const ref = doc(db, document, items.id)

        if (isLoading) {
            return
        }
		setIsConfirmDelete(true)

		try {
			await updateDoc(ref, {
                extraItems: items.extraItems.filter(pm => pm.id !== item.id)
            })
			toast.success('Raderat!')
			setIsOpen(false)
			setIsLoading(false)
			
		} catch(err){
			setIsError(err)
			setIsLoading(false)
		}
    }
    return {
        deleteDocumentField,
        isOpen,
        setIsOpen,
        isConfirmDelete,
        setIsConfirmDelete,
        isError,
        setIsError,
        isLoading,
        setIsLoading, 
    }
    
  
}

export default useDeleteDocumentField