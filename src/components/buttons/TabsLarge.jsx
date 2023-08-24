import { useTranslation } from "react-i18next"
// mui
import React from 'react'
import Button from '@mui/material/Button'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import Stack from '@mui/material/Stack'
//store
import useViewStore from '../../store/useViewStore'

const TabsLarge = ({ tabsTitleKey1, tabsTitleKey2, isEditPage, isProjectPage }) => {
    const isCurrentView = useViewStore((state) => state.isCurrentView)
    const setIsCurrentView = useViewStore((state) => state.setIsCurrentView)
    const { t } = useTranslation()

    
    const handleClick = () => {
        setIsCurrentView({ 
            collection: !isCurrentView.collection, 
            createDoc: !isCurrentView.createDoc,
        })
    }

    return (
        <Grid2 xs={12} mb={0} pb={0} pl={0}>

            {!isEditPage && !isProjectPage  && (
                <Stack spacing={0.5} direction="row">
                    <Button
                        onClick={handleClick} 
                        variant={isCurrentView.collection ? "contained" : "outlined"} 
                        size="large" 
                        sx={{ 
                            width: '100%', 
                            height: '60px',
                            borderRadius: '10px 10px 0  0'
                        }}
                    >
                        {t(`buttons.tabsLarge.${tabsTitleKey1}`)}                   
                    </Button>
                    <Button 
                        onClick={handleClick} 
                        variant={isCurrentView.createDoc ? "contained" : "outlined"} 
                        size="large" 
                        sx={{ 
                            width: '100%', 
                            height: '60px',
                            borderRadius: '10px 10px 0  0'
                        }}
                    >
                        {t(`buttons.tabsLarge.${tabsTitleKey2}`)}                   
                    </Button>
                </Stack>
            )}
        </Grid2> 
       
    )
}

export default TabsLarge