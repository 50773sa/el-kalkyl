// mui
import Button from '@mui/material/Button'
import classNames from 'classnames'

const ButtonComponent = ({ type, variant, color, isFullWidth, title, disabled, onClick }) => {

    const btnColor = classNames({
        '#68A5EC': color === 'blue',
        '#68C37C' : color === 'green' || color === 'success',
        '#ff0000': color === 'red' || color === 'error',
    })

    const onHoverColor = classNames({
        '#3B8AE6': color === 'blue',
        '#47B15E' : color === 'green',
        '#E1341E': color === 'red' || color === 'error',
        'transparent': color === 'transparent'
    })

    return (
        <Button 
            type={type}           
            variant={variant}
            size="large"
            fullWidth={isFullWidth}
            sx={{ 
                mt: 3, 
                mb: 2, 
                py: 1,
                width: {xs: '100%', md: '250px' },
                whiteSpace: 'nowrap',
                backgroundColor: btnColor,
                '&:hover': { backgroundColor: onHoverColor },
            }}
            disabled={disabled}
            onClick={onClick && onClick}
        > 
            <span style={{ display: 'flex', alignItems: 'center' , whiteSpace: 'nowrap' }}>
                {title}
            </span>
        </Button>
    )
}



export default ButtonComponent