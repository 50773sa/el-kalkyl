// mui
import Button from '@mui/material/Button'
import classNames from 'classnames'

const ButtonComponent = ({ type, variant, color, size, isFullWidth, title, onClick }) => {

    const buttonColor = classNames({
        '#68A5EC': color === 'blue',
        '#68C37C' : color === 'green' || color === 'success',
        '#DC822F': color === 'orange',
        '#CBC309': color === 'yellow',
        '#ff0000': color === 'error',
    })

    return (
        <Button 	
            type={type}           
            variant={variant}
            size={size}
            fullWidth={isFullWidth}
            sx={{ 
                mt: 3, 
                mb: 2, 
                p: 1,
                width: '150px',
                whiteSpace: 'nowrap',
                backgroundColor: buttonColor,
                textAlign: 'center'
            }}
            onClick={onClick && onClick}
        > {title}
        </Button>
    )
}

export default ButtonComponent