import React from 'react'
import { Box, Grid, Paper, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../../../data/reducers/UserSlice'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../data/store'

const DashboardSidebar = () => {

    const { currentUser } = useSelector((state: RootState) => state.userR);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const logoutFunction = () => {
        dispatch(logoutUser());
    }
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Navigation
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Link to="/dashboard" color="primary" style={{ marginBottom: 1 }}>
                    Dashboard
                </Link>
                <Link to="/order-list" color="primary" style={{ marginBottom: 1 }}>
                    Orders
                </Link>
                <Link to="/update-details" color="primary" style={{ marginBottom: 1 }}>
                    Account Details
                </Link>
                <Link to="#" onClick={logoutFunction} color="primary" style={{ marginBottom: 1 }}>
                    Logout
                </Link>
            </Box>
            {
                currentUser?.userRoleName == 'Admin' ?
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" gutterBottom>
                            Admin options
                        </Typography>
                        <Link to="/admin/create-product" color="primary" style={{ marginBottom: 1 }}>
                            Create Product
                        </Link>
                        <Link to="/admin/product-list" color="primary" style={{ marginBottom: 1 }}>
                            Product List
                        </Link>
                        <Link to="/admin/order-list" color="primary" style={{ marginBottom: 1 }}>
                            Order List
                        </Link>
                        <Link to="/admin/user-list" color="primary" style={{ marginBottom: 1 }}>
                            User List
                        </Link>
                    </Box> : null
            }
        </Box>
    )
}

export default DashboardSidebar