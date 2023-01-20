import { useAuthContext } from "../contexts/AuthContextProvider"
import { Navigate } from 'react-router-dom'

const RequireAuth = ({ children, redirectTo = '/' }) => {
    const { currentUser } = useAuthContext()

    return (
        currentUser
         ? children
         : <Navigate to={redirectTo} />
    )
}

export default RequireAuth