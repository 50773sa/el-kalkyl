import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContextProvider'
import { db } from '../firebase'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import useStreamDoc from '../hooks/useStreamDoc';
// mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SettingsIcon from '@mui/icons-material/Settings'
import EnterCompanyModal from './EnterCompanyModal.jsx'
import useGetUser from '../hooks/useGetUser';
import LoadingBackdrop from './LoadingBackdrop';


const UserHome = () => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(true)
    const { currentUser, userName } = useAuthContext()
	// const { data } = useGetUser()
    const { id } = useParams()

    const navigate = useNavigate()
    const { data } = useStreamDoc('users', id)
	console.log('*******',data.company)


    // useEffect(() => {
    //     setLoading(true)
    //     console.log('data', data?.map(user => user.company))

    //     if(!data) {
    //         return
    //     }
    //     setLoading(false)
    // }, [currentUser, data])


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

                <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
                    {data?.company}
                    {/* {data ? 
                        data?.map((user) => (
                            <Typography key={user.id} variant="h6" component="div" textAlign='center' >
                                {user.company}
                            </Typography>
                        )): 
                        <Typography variant="h6" component="div" textAlign='center' >
                            Profil
                        </Typography>
                    } */}
             
                    <SettingsIcon style={{ position: 'absolute', right: '1rem', bottom: '1rem'}}/>
                </CardContent>
            </Card>

            {/*//! Ändra till dynamiska namn */}

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
             *  "Captions"
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
                   <strong>5</strong>  
                   <br/> projekt
                </Typography>
                <Typography variant="h7" component="span" textAlign='center'>
                    -------
                </Typography>
            </div>


            {/** 
             * Project buttons 
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
                    onClick={() => console.log('click')} 
                    style={{ 
                        width: '80%',
                        height: '50px', 
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
                    onClick={() => console.log('click')} 
                    style={{
                        width: '20%',
                        height: '50px', 
                        padding: '1.5rem',
                        backgroundColor: '#CBC309',

                    }}
                >
                    <CardContent>
                        <Typography variant="h8" component="div" textAlign='center'>
                            ?
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
                    onClick={() => navigate(`/user/${currentUser.uid}/settings/add-material`)} 
                    style={{ width: '20%', height: '50px', padding: '1.5rem', display:' flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#68A5EC' }}
                >
                    <CardContent className='center'>
                        <AddCircleOutlineIcon />
                    </CardContent>

                </Card>

                <Card 
                    onClick={() => navigate(`/user/${currentUser.uid}/create-project`)} 
                    style={{ width: '80%', height: '50px', padding: '1.5rem', backgroundColor: '#68C37C' }}
                >
                    <CardContent>
                        <Typography variant="h8" component="div" textAlign='center'>
                            Ny beräkning
                        </Typography>
                    </CardContent>
                </Card>
            </div>

            {/* {loading ? <EnterCompanyModal open={open} setOpen={setOpen}  /> : ''} */}
        </div>
          
    )
}

export default UserHome