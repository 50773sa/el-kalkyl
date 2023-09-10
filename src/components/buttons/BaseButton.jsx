import { useTranslation } from 'react-i18next'
// mui
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'

const BaseButton = ({ type, variant, size, isFullWidth, sx, disabled, onClick, title }) => {
    const { t } = useTranslation()
    return (
        <Tooltip title={t(`buttons.addField`, 'Add field')}>
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
        </Tooltip>
    )
}

export default BaseButton