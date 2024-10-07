import React from 'react';
import {
    Grid, Paper, Typography, RadioGroup, Radio, FormControlLabel, Button, Divider, Box
} from '@mui/material';
import { useCreateOrderMutation, useGetCartDetailsQuery } from '../data/redux/api';
import { enqueueSnackbar } from 'notistack';
import { ALERT_SEVERITY } from '../data/config';
import DashboardLayout from '../layout/DashboardLayout';

const Order = () => {
    const { data: cartDetails } = useGetCartDetailsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const [createOrder] = useCreateOrderMutation();
    const [selectedPayment, setSelectedPayment] = React.useState('bank-transfer');

    const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedPayment((event.target as HTMLInputElement).value);
    };

    const calculatePrice = () => {
        let totalPrice = 0
        cartDetails?.cartItems.forEach((item: any) => {
            totalPrice = totalPrice + (item.product?.variations?.map((p: any) => p.price) * item.quantity)
        })
        return totalPrice.toFixed(2);
    }

    const placeOrder = async () => {
        const response: any = await createOrder(undefined)
        console.log(response)
        if (response.error) {
            enqueueSnackbar(`Error while creating order : ${response.error?.data?.title}`, {
                variant: ALERT_SEVERITY.error,
            });
        } else {
            enqueueSnackbar(`${response.data?.message}`, {
                variant: ALERT_SEVERITY.success,
            });
        }
    }

    return (
        <DashboardLayout>
            {/* Order Summary Title */}
            <Typography variant="h5" gutterBottom>
                Your Order
            </Typography>

            {/* Product and Order Details */}
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography>Product</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography align="right">Total</Typography>
                </Grid>
                {
                    cartDetails?.cartItems?.map((item: any) => {
                        return (
                            <React.Fragment>
                                <Grid item xs={8}>
                                    <Typography>{item.product?.title} × {item?.quantity}</Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography align="right">${item.product?.variations?.map((p: any) => p.price) * item.quantity}</Typography>
                                </Grid>
                            </React.Fragment>
                        )
                    })
                }


            </Grid>
            <Divider sx={{ marginY: 2 }} />

            {/* Total */}
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <Typography variant="h6">Total</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h6" align="right">
                        ${calculatePrice()}
                    </Typography>
                </Grid>
            </Grid>

            {/* Payment Methods */}
            <Paper elevation={1} sx={{ padding: 2, marginTop: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Payment Method
                </Typography>
                <RadioGroup
                    value={selectedPayment}
                    onChange={handlePaymentChange}
                    sx={{ marginBottom: 2 }}
                >
                    <FormControlLabel
                        value="bank-transfer"
                        control={<Radio />}
                        label="Direct Bank Transfer"
                    />
                    <Typography variant="body2" sx={{ paddingLeft: 4 }}>
                        Make your payment directly into our bank account. Please use your
                        Order ID as the payment reference. Your order will not be shipped
                        until the funds have cleared in our account.
                    </Typography>
                    <FormControlLabel
                        value="check"
                        control={<Radio />}
                        label="Check Payments"
                    />
                    <FormControlLabel
                        value="cod"
                        control={<Radio />}
                        label="Cash on Delivery"
                    />
                </RadioGroup>
            </Paper>

            {/* Place Order Button */}
            <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ marginTop: 3, width: '100%' }}
                onClick={() => placeOrder()}
            >
                Place Order
            </Button>
        </DashboardLayout>
    );
};

export default Order;
