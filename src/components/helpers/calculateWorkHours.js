import { useEffect, useState } from "react"

export default function calculateWorkHours(projects) {
    const [loading, setLoading] = useState(true)
    const [hours, setHours] = useState(null)
    const [minutes, setMinutes] = useState(null)

    const calculate = () => {

         projects?.projectMaterial.map(p => {
            console.log('p?*************', p?.estimatedTime)
            let workingMinutes = (p?.estimatedTime?.hours * 60) + p?.estimatedTime?.minutes
            let totalMinutes = workingMinutes * p?.quantity
            console.log('totalMinutes', totalMinutes)

            console.log('workingMinutes', workingMinutes)
            setHours(Math.floor(totalMinutes / 60))
            setMinutes(totalMinutes % 60)
            setLoading(false)

        })
    }
    
    useEffect(() => {
        setLoading(true)

        // console.log('projects', projects)
        if (hours === null) {
            return
        }
        calculate(projects)
        console.log('projects', projects)
        
   
       
    }, [projects])

    return { hours, minutes }
}

