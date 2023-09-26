import { useState } from "react"
import { db } from '../firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { toast } from "react-toastify"

const useUpdateDoc = () => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(null)
    const [isInputError, setIsInputError] = useState(false)


    const updateOnSubmit = async (data, openRowId) => {
        setIsError(null)
        setIsInputError(false)

        if(!data) return

        const ref = doc(db, 'material', openRowId)

        try {
            await updateDoc(ref, {
                product: data.product.charAt(0).toUpperCase() + data.product.slice(1),
                estimatedTime: {
                    hours: data.hours,
                    minutes: data.minutes,
                },
                category: data.category,
                extraItems: data.extraItems
            })
            setIsSuccess(true)
            toast.success('Sparat!')
            setIsEditMode(false)

        } catch (err) {
            setIsError(err)
            console.error(err)
        }
    }

    return {
        updateOnSubmit,
        isEditMode,
        setIsEditMode,
        isInputError, 
    }
}

export default useUpdateDoc