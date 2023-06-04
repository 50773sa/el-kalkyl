import { useEffect, useState } from "react"

export default function calculateWorkHours(projects) {
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    
    useEffect(() => {

        projects && projects?.projectMaterial.map(p => {

            let workingMinutes = (p?.estimatedTime?.hours * 60) + p?.estimatedTime?.minutes
            let totalMinutes = workingMinutes * p?.quantity

            setHours(Math.floor(totalMinutes / 60))
            setMinutes(totalMinutes % 60)
        })  

       
    }, [projects])

    return { hours, minutes }
}

