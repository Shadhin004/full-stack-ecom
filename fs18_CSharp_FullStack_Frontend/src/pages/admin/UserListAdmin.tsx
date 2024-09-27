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
import { useGetAllOrdersForAdminQuery, useGetAllUsersForAdminQuery, useUpdateOrderStatusMutation, useUpdateUserStatusMutation } from '../../data/redux/api';
import { ALERT_SEVERITY, productPerPage } from '../../data/config';
import GlobalLoader from '../../features/components/sharedComponents/GlobalLoader';
import { enqueueSnackbar } from 'notistack';
import { useSearchParams } from 'react-router-dom';

const UserListAdmin: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams(`PageSize=${productPerPage.toString()}`);
    const { data: userList, isLoading, refetch } = useGetAllUsersForAdminQuery(searchParams.toString())
    const [updateUserStatus] = useUpdateUserStatusMutation()

    const handleUserUpdate = async (e : any, userId : string) =>{
        const modifiedParam = {
            userId : userId,
            status : e.target.value
        }
        const modifiedData : string = new URLSearchParams(modifiedParam).toString()
        const response : any = await updateUserStatus(modifiedData)
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
                        <Typography variant="h4">User List</Typography>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>

                {/* Product Table */}
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Email</TableCell>
                                <TableCell>User name</TableCell>
                                <TableCell>Is active</TableCell>
                                {/* <TableCell align="right">Actions</TableCell> */}
                            </TableRow>
                        </TableHead>
                        {
                            isLoading ?
                                <GlobalLoader />
                                :
                                <TableBody>
                                    {userList?.map((user: any) => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>${user.userRoleName}</TableCell>
                                            <TableCell>
                                                <select name='isUserActive' onChange={(e : any) => handleUserUpdate(e, user.userId)}>
                                                    <option value={"true"} selected={user.isUserActive === true}>True</option>
                                                    <option value={"false"} selected={user.isUserActive ===false}>False</option>
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

export default UserListAdmin;
