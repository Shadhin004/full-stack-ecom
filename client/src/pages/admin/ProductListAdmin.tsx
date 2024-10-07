import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Grid,
    Card,
    CardContent,
    Typography,
    IconButton,
    Box,
    Pagination,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DashboardLayout from '../../layout/DashboardLayout';
import { useDeleteProductsMutation, useGetProductsQuery } from '../../data/redux/api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ALERT_SEVERITY, productPerPage } from '../../data/config';
import GlobalLoader from '../../features/components/sharedComponents/GlobalLoader';
import { enqueueSnackbar } from 'notistack';

const ProductListPage: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams(`PageSize=${productPerPage.toString()}`);
    const { data: productList, isLoading, refetch } = useGetProductsQuery(searchParams.toString())
    const [deleteProduct] = useDeleteProductsMutation()

    const navigate = useNavigate();
    // Handlers for actions
    const handleEdit = (productId: number) => {
        console.log('Edit product', productId);
        navigate(`/admin/edit-product/${productId}`)
    };

    const handleDelete = async (id: string) => {
        const response : any = await deleteProduct(id)
        if (response?.error) {
            enqueueSnackbar(`Something went wrong!`, {
                variant: ALERT_SEVERITY.error,
            });
            refetch()
        } else {
            enqueueSnackbar(`Deleted successfully!`, {
                variant: ALERT_SEVERITY.success,
            });
            refetch()
        }
    };

    const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
        searchParams.set('PageNo', value.toString());
        setSearchParams(searchParams)
    };

    const pageNumber = searchParams.get("PageNo")!

    return (
        <DashboardLayout>
            <Box p={4}>
                {/* Header */}
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h4">Product List</Typography>
                    </Grid>
                    <Grid item>
                        <Button onClick={()=> navigate('/admin/create-product')} variant="contained" color="primary">
                            Add New Product
                        </Button>
                    </Grid>
                </Grid>

                {/* Product Table */}
                <TableContainer component={Paper} sx={{ mt: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Price</TableCell>
                                <TableCell align="right">Inventory</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            isLoading ?
                                <GlobalLoader />
                                :
                                <TableBody>
                                    {productList?.products.map((product: any) => (
                                        <TableRow key={product.id}>
                                            <TableCell>{product.title}</TableCell>
                                            <TableCell>{product.description}</TableCell>
                                            <TableCell align="right">${product.minPrice}</TableCell>
                                            <TableCell align="right">{product.inventory}</TableCell>
                                            <TableCell align="right">
                                                <IconButton color="primary" onClick={() => handleEdit(product.productId)}>
                                                    <Edit />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDelete(product.productId)}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                        }
                    </Table>
                </TableContainer>
                <Pagination sx={{marginY : 3}} onChange={changePage} page={parseInt(pageNumber ? pageNumber : '1')} count={Math.ceil(productList?.totalCount / productPerPage)} />
            </Box>
        </DashboardLayout>
    );
};

export default ProductListPage;
