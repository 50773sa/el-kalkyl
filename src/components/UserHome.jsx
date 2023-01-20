import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContextProvider'
import useStreamDoc from '../hooks/useStreamDoc'
import useStreamCollection from '../hooks/useStreamCollection'
import LoadingBackdrop from './LoadingBackdrop'
// mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SettingsIcon from '@mui/icons-material/Settings'


const UserHome = () => {
    const [completedProjects, setCompletedProjects] = useState(0)
    const { currentUser, userName } = useAuthContext()
    const { data, loading } = useStreamDoc('users', currentUser.uid)
    const { data: projects } = useStreamCollection('projects')
    const navigate = useNavigate()

    useEffect(() => {
        let proj = projects?.filter(project => project.completed === true)
        setCompletedProjects(proj.length)

    }, [completedProjects, projects, currentUser])


    return (
        <div className='wrapper home' id='home'>

            {/** 
             * Profile button and name
             */}

            <Card 
                onClick={() => navigate(`/user/${currentUser.uid}/settings`)} 
                style={{ 
                    display: 'flex',
                    padding: '24px',
                    marginBottom: '2rem',
                    position: 'relative',
                    backgroundColor: '#7ACFFF'
                }}
            >
                {loading && <LoadingBackdrop />}

                <CardContent 
                    style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center', 
                        width: '100%', 
                        cursor: 'pointer'
                    }}
                >
                    {!loading && (
                        <Typography variant="h6" component="div" textAlign='center' >
                            {data?.company ? data?.company : "Profil"}
                        </Typography>
                    )}

                    <SettingsIcon style={{ position: 'absolute', right: '1rem', bottom: '1rem'}}/>
                </CardContent>
            </Card>

            <Typography 
                variant="h7" 
                component="div" 
                textAlign='center' 
                marginBottom='3rem'
            > 
                <em>{userName}</em>
            </Typography>

            <br/>

             {/** 
             *  Number of projects
             */}

            <div 
                style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    paddingLeft: '1rem', 
                    paddingRight: '1rem'
                }}
            >
                <Typography variant="h7" component="span" textAlign='center' marginBottom='2rem'>
                   <strong>{projects?.length ? projects.length : "0"}</strong>  
                   <br/> Projekt
                </Typography>

                <Typography variant="h7" component="span" textAlign='center'>
                    <strong>{completedProjects}</strong>  
                    <br/> Aktiva projekt
                </Typography>
            </div>

            {/** 
             *  Navigation buttons 
             */}

            <div 
                style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    gap: '1rem', 
                    marginBottom: '1rem',
                    cursor: 'pointer'
                }}
            >
                <Card 
                    onClick={() => navigate(`/user/${currentUser.uid}/projects`)}
                    style={{ 
                        width: '80%',
                        height: '100px', 
                        padding: '1.5rem',
                        backgroundColor: '#DC822F',
                    }}
                >
                    <CardContent>
                        <Typography variant="h8" component="div" textAlign='center'>
                            Projekt
                        </Typography>
                    </CardContent>
                </Card>

                <Card 
                    onClick={() => console.log('Under uppbyggnads')} 
                    style={{
                        width: '20%',
                        height: '100px', 
                        padding: '1.5rem',
                        backgroundColor: '#CBC309',

                    }}
                >
                    <CardContent>
                        <Typography variant="h8" component="div" textAlign='center'>
                            -
                        </Typography>
                    </CardContent>
                </Card>
            </div>

            <div 
                style={{ 
                    display: 'flex', 
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    gap: '1rem',
                    cursor: 'pointer',
                }}
            >
                <Card 
                    onClick={() => navigate(`/user/${currentUser.uid}/settings/create-material`)} 
                    style={{ 
                        width: '20%', 
                        height: '100px', 
                        padding: '1.5rem', 
                        display:' flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        backgroundColor: '#68A5EC' 
                    }}
                >
                    <CardContent className='center'>
                        <AddCircleOutlineIcon />
                    </CardContent>

                </Card>

                <Card 
                    onClick={() => navigate(`/user/${currentUser.uid}/create-project`)} 
                    style={{ width: '80%', height: '100px', padding: '1.5rem', backgroundColor: '#68C37C' }}
                >
                    <CardContent>
                        <Typography variant="h8" component="div" textAlign='center'>
                            Ny beräkning
                        </Typography>
                    </CardContent>

                </Card>
            </div>
        </div>     
    )
}

export default UserHome