import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const GlobalLoader = () => {
    return (
        <Box sx={{textAlign : 'center'}}>
            <CircularProgress sx={{ height: '100px' }} />
        </Box>
    )
}

export default GlobalLoader