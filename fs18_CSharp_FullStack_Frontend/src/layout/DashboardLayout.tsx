import { Box, Grid2, Paper } from '@mui/material'
import React from 'react'
import DashboardSidebar from '../features/components/sharedComponents/DashboardSidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box className="container" sx={{ marginTop: '10px' }}>
            <Grid2 container spacing={3}>
                {/* Main Content */}
                <Grid2 size={{xs:12, md:9}}>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        {children}
                    </Paper>
                </Grid2>
                {/* Sidebar Navigation */}
                <Grid2 size={{xs:12, md:3}}>
                    <Paper elevation={3} sx={{ padding: 3 }}>
                        <DashboardSidebar />
                    </Paper>
                </Grid2>
            </Grid2>
        </Box>
    )
}

export default DashboardLayout