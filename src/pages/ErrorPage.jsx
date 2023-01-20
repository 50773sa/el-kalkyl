import Container from '@mui/material/Container'
import Button from '@mui/material/Button';

const ErrorPage = () => {
    return (
        <Container>
            <div className='wrapper error' id='error'>
                <div style={{ display: 'flex', flexDirection: 'column', justfyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ fontSize: '10rem', margin: '0px'}}>404</h1>
                    <h2>
                        <span>Oops! </span>
                        Sidan du letar efter finns inte!
                    </h2>
               
                    <Button
                        type="a"
                        href='/'
                        variant="contained"
                        style={{ width: '300px'}}
                    >
                        Gå till förstasidan!
                    </Button>
                </div>
            </div>

        </Container>
    )
}

export default ErrorPage