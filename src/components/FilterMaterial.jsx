import { useEffect, useRef, useState } from "react"
import { db } from '../firebase'
import { addDoc, collection, where } from 'firebase/firestore'
import useStreamCollection from "../hooks/useStreamCollection"

const FilterMaterial = (selected) => {
    const [loading, setLoading] = useState(true)
    const [currentCategory, setCurrentCategory] = useState()
    const [currentFilter, setCurrentFilter] = useState()
    const { data: material, loading: isStreaming} = useStreamCollection('material', 'Apparater')
    console.log('data!!!!!!!!!!', material)


    const filteredMaterial = material ? material.filter((material) => {
        //if it returns true is it saved in filteredrestaurants array
        
        switch (selected) {
            case 'Category':
                return true
            case 'Apparater':
            case 'Belysning':
            case 'Tele':
                return material.category === selected
            default:
                return true
        }
    }) : null
    setCurrentCategory(filteredMaterial)
    setCurrentFilter(selected)
    setLoading(false)

    return(
        currentCategory,
        currentFilter
    )

}

export default FilterMaterial