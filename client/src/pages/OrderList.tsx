import React from 'react';
import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    Link,
    Box,
} from '@mui/material';
import { useGetAllOrdersQuery } from '../data/redux/api';
import DashboardLayout from '../layout/DashboardLayout';

const OrderDetails = () => {
    const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    return (
        <DashboardLayout>
            <Typography variant="h5" gutterBottom>
                My Account
            </Typography>

            {/* Table displaying the orders */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orders?.map((item: any) => {
                                return (
                                    <TableRow>
                                        <TableCell>
                                            <Link href="#" underline="hover" color="secondary">
                                                {item?.orderId}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{item?.createdAt}</TableCell>
                                        <TableCell>{item?.orderStatus}</TableCell>
                                        <TableCell>${item?.totalAmount}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" size="small">
                                                View
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </DashboardLayout>
    );
};

export default OrderDetails;
