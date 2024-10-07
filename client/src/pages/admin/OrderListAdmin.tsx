import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    Typography,
    Box,
} from '@mui/material';
import DashboardLayout from '../../layout/DashboardLayout';
import { useGetAllOrdersForAdminQuery, useUpdateOrderStatusMutation } from '../../data/redux/api';
import { ALERT_SEVERITY } from '../../data/config';
import GlobalLoader from '../../features/components/sharedComponents/GlobalLoader';
import { enqueueSnackbar } from 'notistack';

const OrderListAdmin: React.FC = () => {

    const { data: orderList, isLoading, refetch } = useGetAllOrdersForAdminQuery(undefined)
    const [updateOrderStatus] = useUpdateOrderStatusMutation()

    const handleOrderUpdate = async (e : any, orderId : string) =>{
        const modifiedParam = {
            orderId : orderId,
            orderStatus : e.target.value
        }
        const response : any = await updateOrderStatus(modifiedParam)
        if (response?.error) {
            enqueueSnackbar(`Something went wrong!`, {
                variant: ALERT_SEVERITY.error,
            });
            refetch()
        } else {
            enqueueSnackbar(`Updated successfully!`, {
                variant: ALERT_SEVERITY.success,
            });
            refetch()
        }
    }
    return (
        <DashboardLayout>
            <Box p={4}>
                {/* Header */}
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h4">Order List</Typography>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>

                {/* Product Table */}
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order Id</TableCell>
                                <TableCell>Total Amount</TableCell>
                                <TableCell>Status</TableCell>
                                {/* <TableCell align="right">Actions</TableCell> */}
                            </TableRow>
                        </TableHead>
                        {
                            isLoading ?
                                <GlobalLoader />
                                :
                                <TableBody>
                                    {orderList?.map((order: any) => (
                                        <TableRow key={order.id}>
                                            <TableCell>{order.orderId}</TableCell>
                                            <TableCell>${order.totalAmount}</TableCell>
                                            <TableCell>
                                                <select name='orderStatus' onChange={(e : any) => handleOrderUpdate(e, order.orderId)}>
                                                    <option value={'Pending'} selected={order.orderStatus === "Pending"}>Pending</option>
                                                    <option value={'Approved'} selected={order.orderStatus === "Approved"}>Approved</option>
                                                    <option value={'Shipped'} selected={order.orderStatus === "Shipped"}>Shipped</option>
                                                    <option value={'Declined'} selected={order.orderStatus === "Declined"}>Declined</option>
                                                </select>
                                            </TableCell>
                                            <TableCell align="right">
                                                {/* <IconButton color="primary" onClick={() => handleEdit(order.orderId)}>
                                                    <Edit />
                                                </IconButton> */}
                                                {/* <IconButton color="error" onClick={() => handleDelete(order.orderId)}>
                                                    <Delete />
                                                </IconButton> */}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                        }
                    </Table>
                </TableContainer>
                {/* <Pagination sx={{marginY : 3}} onChange={changePage} page={parseInt(pageNumber ? pageNumber : '1')} count={Math.ceil(productList?.totalCount / productPerPage)} /> */}
            </Box>
        </DashboardLayout>
    );
};

export default OrderListAdmin;
