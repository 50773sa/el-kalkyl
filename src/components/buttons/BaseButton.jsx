// mui
import Button from '@mui/material/Button'

const BaseButton = ({ type, variant, size, isFullWidth, sx, disabled, onClick, title }) => {
    return (
        <Button 
            aria-label='Add one more field'
            type={type}           
            variant={variant}
            size={size}
            fullWidth={isFullWidth}
            sx={sx}
            disabled={disabled}
            onClick={onClick && onClick}
        > 
            <span style={{ display: 'flex', alignItems: 'center' , whiteSpace: 'nowrap' }}>
                {title}
            </span>
        </Button>
    )
}

export default BaseButton