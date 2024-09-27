import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, Button, List, ListItem, ListItemText, TextField, Select, MenuItem, Grid2, Pagination, CircularProgress } from '@mui/material';
import ProductCardMini from '../features/components/product/ProductCardMini';
import { useGetCategoriesQuery, useGetProductsQuery } from '../data/redux/api';
import { Link, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { productPerPage } from '../data/config';
import GlobalLoader from '../features/components/sharedComponents/GlobalLoader';


const ProductSearch = () => {
    const { data: categories } = useGetCategoriesQuery('s');

    //Search
    const [searchParams, setSearchParams] = useSearchParams(`PageSize=${productPerPage.toString()}`);
    const { data: products, error: productsError, isLoading: productsLoading } = useGetProductsQuery(searchParams.toString());

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = (data: any) => {
        setSearchParams(data);
    }

    const resetSearch = () => {
        setSearchParams('')
        reset()
    }

    const handleSearchByCategory = (categoryId: string) => {
        searchParams.set("CategoryId", categoryId)
        setSearchParams(searchParams)
    }

    const handleSorting = (sortingMethod: string) => {
        searchParams.set("OrderWith", sortingMethod)
        setSearchParams(searchParams)
    }

    const changePage = (event: React.ChangeEvent<unknown>, value: number) => {
        searchParams.set('PageNo', value.toString());
        setSearchParams(searchParams)
    };

    const pageNumber = searchParams.get("PageNo")!

    return (
        <Box className="container">
            <Grid2 container spacing={4} sx={{ padding: 4 }}>

                {/* Sidebar */}
                <Grid2 size={{ xs: 12, md: 3 }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <p>Current query: {query}</p> */}
                        <TextField
                            variant="outlined"
                            label="Search..."
                            fullWidth
                            value={searchParams.get('Search')}
                            size='small'
                            {...register('Search')}
                        />
                        <Button type='submit' variant='contained' size='small' sx={{ marginTop: '10px', marginRight: '10px' }}> Search </Button>
                        <Button type='button' variant='outlined' size='small' onClick={() => resetSearch()} sx={{ marginTop: '10px', marginRight: '10px' }}> Reset </Button>
                    </form>
                    <Typography variant="h6" gutterBottom>Categories</Typography>
                    <List>
                        {categories?.map((category: any, index: number) => (
                            <React.Fragment key={index}>
                                <MenuItem>
                                    <ListItemText onClick={() => handleSearchByCategory(category.categoryId)} primary={category.categoryName} />
                                </MenuItem>
                                {/* {category.subcategories?.map((sub, subIndex) => (
                                    <ListItem key={subIndex} sx={{ paddingLeft: 4 }}>
                                        <ListItemText primary={sub} />
                                    </ListItem>
                                ))} */}
                            </React.Fragment>
                        ))}
                    </List>
                </Grid2>

                {/* Product Grid */}
                <Grid2 size={{ xs: 12, md: 9 }}>
                    <Grid2 container justifyContent="space-between" alignItems="center">
                        <Typography variant="h5">ANNIVERSARY</Typography>
                        <Grid2 container spacing={1} alignItems="center">
                            <Typography variant="body2">Total {products?.totalCount} results</Typography>
                            <Select defaultValue="title" onChange={(e) => handleSorting(e.target.value)} sx={{ marginLeft: 2 }}>
                                <MenuItem value="title">Sort by title</MenuItem>
                                <MenuItem value="price">Sort by price</MenuItem>
                                <MenuItem value="inventory">Sort by inventory</MenuItem>
                            </Select>
                        </Grid2>
                    </Grid2>

                    {/* Product Cards */}
                    {
                        productsLoading ?
                        <GlobalLoader />
                            :
                            <Grid2 container spacing={2} sx={{ marginTop: 2 }}>
                                {products?.products?.map((product: any) => (
                                    // <ProductCardMini product={product} />
                                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={product.productId}>
                                        <Card sx={{ height: '100%' }}>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={"https://th.bing.com/th/id/OIP.Vtxy0FjT_EfudI4cQk1kzAHaE8?rs=1&pid=ImgDetMain"}
                                                alt={product.title}
                                            />
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>{product.title}</Typography>
                                                <Typography variant="body1">${product.minPrice.toFixed(2)}</Typography>
                                                <Link to={`/products/${product.productId}`}>
                                                    <Button variant="outlined" color="secondary" fullWidth sx={{ marginTop: 1 }}>
                                                        View details
                                                    </Button>
                                                </Link>
                                                {/* <Button onClick={()=> addToCart(product)} variant="contained" color="secondary" fullWidth sx={{ marginTop: 1 }}>
                                            Add to Cart
                                        </Button> */}
                                            </CardContent>
                                        </Card>
                                    </Grid2>
                                ))}
                            </Grid2>
                    }
                </Grid2>
            </Grid2>

            <Pagination onChange={changePage} page={parseInt(pageNumber ? pageNumber : '1')} count={Math.ceil(products?.totalCount / productPerPage)} />
        </Box>

    );
};

export default ProductSearch;
