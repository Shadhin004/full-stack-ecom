import React, { useState } from 'react';
import { Grid2, Typography, Card, CardMedia, CardContent, Button, TextField, Radio, RadioGroup, FormControlLabel, Box, Stack, Divider } from '@mui/material';
import { useGetCartDetailsQuery, useRemoveCartItemMutation, useUpdateCartItemMutation } from '../data/redux/api';
import { enqueueSnackbar } from 'notistack';
import { ALERT_SEVERITY } from '../data/config';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';

const Cart = () => {
    const { data: cartDetails, error, isLoading, refetch } = useGetCartDetailsQuery(undefined, {
        refetchOnMountOrArgChange: true,
      });
    const [removeCartItem] = useRemoveCartItemMutation();

    const [updateCartItem] = useUpdateCartItemMutation()

    const handleRemoveCartItem = async (itemId : string)=>{
        try {
            const response : any = await removeCartItem(itemId)
            console.log(response)
            enqueueSnackbar(response.data?.message, {
                variant: ALERT_SEVERITY.success
            });
            refetch()
        } catch (error) {
            enqueueSnackbar(`Something went wrong! ${error}`, {
                variant: ALERT_SEVERITY.error
            });
            refetch()
        }
    }

    const [updateQty, setUpdateQty] = useState(0)
    const navigate = useNavigate()

    const handleUpdateCart = async (item : any) =>{

        const updatedata : any = {
            cartItemId : item?.cartItemsId,
            productId : item.product?.productId,
            quantity : updateQty,
            variantId: item.variation?.variationId
        }
        const modifiedData : string = new URLSearchParams(updatedata).toString()
        try {
            const response : any = await updateCartItem(modifiedData)
            enqueueSnackbar('Updated Successfully!', {
                variant: ALERT_SEVERITY.success
            });
            refetch()
        } catch (error) {
            enqueueSnackbar(`Something went wrong! ${error}`, {
                variant: ALERT_SEVERITY.error
            });
            refetch()
        }

    }
    
    return (
        <DashboardLayout>
            <Grid2 container spacing={2} sx={{ padding: 2 }}>
                {/* Cart Item */}
                <Grid2 size={{ xs: 12, md: 12 }}>
                    <Card sx={{ padding: 2 }}>
                        <Typography variant="h5" gutterBottom>CART</Typography>
                        {
                            cartDetails?.cartItems?.map((item: any) => {
                                return (
                                    <Box sx={{marginBottom : '5px'}} key={item.cartItemsId}>
                                        <Grid2 container spacing={2} alignItems="center">
                                            <Grid2 size={{ xs: 3 }}>
                                                <CardMedia
                                                    component="img"
                                                    image="https://jooinn.com/images/spring-flower-1.jpg"
                                                    alt="Basket Arrangement Lilies & Orchids"
                                                />
                                            </Grid2>
                                            <Grid2 size={{ xs: 9 }}>
                                                <Typography variant="h6">{item?.product?.title}</Typography>
                                                <Typography variant="body1">{item?.variations?.map((i: any) => i.price)}</Typography>
                                                <Stack direction={'row'}>

                                                    <TextField
                                                        type="number"
                                                        defaultValue={item?.quantity}
                                                        sx={{ width: 60, marginTop: 0 }}
                                                        size='small'
                                                        onChange={(e)=> setUpdateQty(parseInt(e.target.value))}
                                                    />
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        sx={{ marginLeft: 2 }}
                                                        size='small'
                                                        onClick={()=> handleRemoveCartItem(item.cartItemsId)}
                                                    >
                                                        Remove
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        sx={{ marginLeft: 2 }}
                                                        size='small'
                                                        onClick={()=> handleUpdateCart(item)}
                                                    >
                                                        Update
                                                    </Button>
                                                </Stack>
                                            </Grid2>
                                        </Grid2>
                                        <Divider />
                                    </Box>
                                )
                            })
                        }

                        {/* <Grid2 container justifyContent="space-between" sx={{ marginTop: 2 }}>
                            <Button variant="contained" color="secondary">Continue Shopping</Button>
                            <Button variant="contained" color="primary">Update Cart</Button>
                        </Grid2> */}
                    </Card>
                </Grid2>
            </Grid2>
            {/* Discount Code & Cart Totals */}
            <Grid2 container spacing={2} sx={{ padding: 2 }}>
                <Grid2 size={{ xs: 12, md: 12 }}>
                    {/* Discount Codes */}
                    {/* <Card sx={{ padding: 2, marginBottom: 2 }}>
                        <Typography variant="h6" gutterBottom>DISCOUNT CODES</Typography>
                        <TextField
                            label="Coupon code"
                            variant="outlined"
                            fullWidth
                        />
                        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>Apply Coupon</Button>
                    </Card> */}

                    {/* Cart Totals */}
                    <Card sx={{ padding: 2 }}>
                        {/* <Typography variant="h6" gutterBottom>CART TOTALS</Typography>
                        <Typography variant="body1">Subtotal: $60.00</Typography> */}
                        <Typography variant="body1" sx={{ marginTop: 1 }}>Shipping:</Typography>

                        <RadioGroup defaultValue="flat" name="shipping-options">
                            <FormControlLabel value="free" control={<Radio />} label="Free Shipping" />
                        </RadioGroup>

                        <Typography variant="body2" sx={{ color: 'red' }}>
                            Shipping to Finland.
                        </Typography>

                        <Typography variant="h6" sx={{ marginTop: 2 }}>Total: $61.00</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: 2 }}
                            onClick={()=> navigate('/order')}
                        >
                            Proceed to Checkout
                        </Button>
                    </Card>
                </Grid2>
            </Grid2>
        </DashboardLayout>
    );
};

export default Cart;
