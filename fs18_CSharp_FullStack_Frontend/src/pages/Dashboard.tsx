import React from 'react'
import DashboardLayout from '../layout/DashboardLayout'
import Cart from './Cart'
import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <DashboardLayout>
            {/* <Dashboard /> */}
            <Box sx={{ padding: 3 }}>
                {/* Heading */}
                <Typography variant="h5" gutterBottom>
                    My Account
                </Typography>

                {/* Welcome message */}
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    Hello{' '}
                    <Typography component="span" fontWeight="bold">
                        baseit.tanveer
                    </Typography>{' '}
                    (not{' '}
                    <Typography component="span" fontWeight="bold">
                        baseit.tanveer
                    </Typography>
                    ? <Link to="#" color="secondary">Log out</Link>)
                </Typography>

                {/* Dashboard description */}
                <Typography variant="body1">
                    From your account dashboard you can view your{' '}
                    <Link to="#" color="secondary">
                        recent orders
                    </Link>
                    , manage your{' '}
                    <Link to="#" color="secondary">
                        shipping and billing addresses
                    </Link>
                    , and{' '}
                    <Link to="#" color="secondary">
                        edit your password and account details
                    </Link>
                    .
                </Typography>
            </Box>
        </DashboardLayout>
    )
}

export default Dashboard