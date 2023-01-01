import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContextProvider';

// mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import SettingsIcon from '@mui/icons-material/Settings';
import EnterCompanyModal from './EnterCompanyModal.jsx';


const UserHome = () => {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(true)
    const navigate = useNavigate()
    const { currentUser, userName } = useAuthContext()
    const [userCompany, setUserCompany] = useState(null)

    useEffect(() => {
        console.log('company',currentUser.company)
        setLoading(true)
        if(!currentUser.company === undefined) {
            setOpen(true)
            setLoading(false)
        }
    }, [currentUser])
    console.log('userCompany', userCompany)

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
                }}
            >
                <CardContent style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%'}}>
                    <Typography variant="h6" component="div" textAlign='center' >
                        {/* Profile/Settings */}
                        {userCompany}
                    </Typography>
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
                        padding: '1.5rem'
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
                        padding: '1.5rem'
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
                    cursor: 'pointer'
                }}
            >
                <Card 
                    onClick={() => navigate(`/user/${currentUser.uid}/settings/add-material`)} 
                    style={{ width: '20%', height: '50px', padding: '1.5rem', display:' flex', justifyContent: 'center', alignItems: 'center'}}
                >
                    <CardContent className='center'>
                        <AddCircleOutlineIcon />
                    </CardContent>

                </Card>

                <Card 
                    onClick={() => navigate(`/user/${currentUser.uid}/create-project`)} 
                    style={{ width: '80%', height: '50px', padding: '1.5rem'}}
                >
                    <CardContent>
                        <Typography variant="h8" component="div" textAlign='center'>
                            Ny beräkning
                        </Typography>
                    </CardContent>
                </Card>
            </div>

            {loading ? <EnterCompanyModal open={open} setOpen={setOpen} userCompany={userCompany} setUserCompany={setUserCompany} /> : ''}
        </div>
          
    )
}

export default UserHome