import React, { useEffect, useState } from 'react';
import { Typography, Box, Button, CardMedia, IconButton, Chip, Badge, TextField, Grid2 } from '@mui/material';
import Slider from 'react-slick'
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProductDetailsQuery, useAddCartItemMutation } from '../data/redux/api';
import { useSelector } from 'react-redux';
import { RootState } from '../data/store';
import { enqueueSnackbar } from 'notistack';
import { ALERT_SEVERITY } from '../data/config';
import GlobalLoader from '../features/components/sharedComponents/GlobalLoader';

interface imageInterface {
    src: string;
    alt: string
}

const ProductDetail = () => {
    const images:
        imageInterface[]
        = [
            { src: 'https://th.bing.com/th/id/OIP.Vtxy0FjT_EfudI4cQk1kzAHaE8?rs=1&pid=ImgDetMain', alt: 'Product Image 1' },
            { src: 'https://jooinn.com/images/spring-flower-1.jpg', alt: 'Product Image 2' },
            { src: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Beautiful-pink-flower_-_West_Virginia_-_ForestWander.jpg', alt: 'Product Image 3' },
        ];

    const navigate = useNavigate();
    const { productId } = useParams()
    const { data: productDetails, error, isLoading } = useGetProductDetailsQuery(productId);

    const [largeImage, setLargeImage] = useState(0)
    const [selectedVariation, setSelectedVariation] = useState(productDetails? productDetails?.variations[0] : null)
    const [quantity, setQualtity] = useState(1)

    const [addCartItem] = useAddCartItemMutation();
    const { currentUser } = useSelector((state: RootState) => state.userR);

    const addToCart = async () => {
        if (currentUser) {
            try {
                var cartItem = {
                    userId: currentUser?.userId,
                    productId: productId,
                    variationId: selectedVariation.variationId,
                    quantity: quantity
                }

                const response = await addCartItem({ cartItem }).unwrap();
                enqueueSnackbar(`Item added to cart`, {
                    variant: ALERT_SEVERITY.success,
                });
            } catch (error) {
                console.error('Failed to add item to cart:', error);
            }
        } else {
            navigate("/login")
        }
    }
    console.log(productDetails?.variations[0])

    useEffect(()=>{
        if(productDetails){
            setSelectedVariation(productDetails?.variations[0])
        }
    },[productDetails])

    return (
        <Box sx={{ padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
            {
                isLoading ?
                    <GlobalLoader />
                    :
                    <Grid2 container spacing={4}>
                        {/* Product Images */}
                        <Grid2 size={{ xs: 12, md: 5 }}>
                            <CardMedia
                                component="img"
                                image={images[largeImage].src}
                                alt="Glass Vase with Red and White Roses"
                                sx={{ borderRadius: 2, boxShadow: 3 }}
                            />
                            <Slider dots={true} infinite={true} slidesToShow={3} slidesToScroll={1}>
                                {images.map((image, index) => (
                                    <CardMedia
                                        key={index}
                                        component="img"
                                        image={image.src}
                                        alt={image.alt}
                                        sx={{ margin: 1, borderRadius: 2, boxShadow: 1, maxWidth: '100px' }}
                                        onClick={() => setLargeImage(index)}
                                    />
                                ))}
                            </Slider>
                        </Grid2>

                        {/* Product Information */}
                        <Grid2 size={{ xs: 12, md: 7 }}>
                            {/* Product Title and Price */}
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                {productDetails?.title}
                            </Typography>
                            {/* <Typography component={"span"} fontWeight="bold" gutterBottom>
                        {productDetails?.variations?.map((item: any) => item.variationName)}
                    </Typography> */}

                            <Box display="flex" alignItems="center">
                                {/* <Typography variant="h6" color="textSecondary" sx={{ textDecoration: 'line-through', marginRight: '10px' }}>
                            $325.00
                        </Typography> */}
                                <Typography variant="h4" color="primary">
                                    {/* €{productDetails?.variations?.map((item: any) => item.price)} */}
                                    €{selectedVariation?.price}
                                </Typography>
                            </Box>

                            {/* Stock Status */}
                            <Chip label={`In Stock (${selectedVariation?.inventory})`} color="success" sx={{ marginTop: '10px' }} />

                            {/* Quick Overview */}
                            <Typography variant="h6" sx={{ marginTop: '20px', fontWeight: 'bold' }}>
                                Quick Overview
                            </Typography>
                            <Typography variant="body1" color="textSecondary">
                                {productDetails?.description}
                            </Typography>

                            {/* Quantity and Add to Cart */}
                            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
                                <TextField
                                    type="number"
                                    label="Quantity"
                                    size='small'
                                    value={quantity}
                                    InputProps={{ inputProps: { min: 1 } }}
                                    sx={{ width: '100px', marginRight: '20px' }}
                                    onChange={(e) => setQualtity(parseInt(e.target.value))}
                                />
                                {
                                    productDetails?.variations?.map((item: any) => {
                                        return (
                                            <Button onClick={() => setSelectedVariation(item)} variant={selectedVariation?.variationId === item.variationId ? 'contained' : 'outlined'} size='small' sx={{ marginRight: '10px' }}>{item.variationName}</Button>
                                        )
                                    })
                                }
                                <Button onClick={() => addToCart()} variant="contained" size="small" sx={{ textTransform: 'none', backgroundColor: 'black' }}>
                                    Add to Cart
                                </Button>
                            </Box>

                            {/* Wishlist and Compare */}
                            <Box sx={{ display: 'flex', marginTop: '10px' }}>
                                {/* <IconButton color="default">
                            <FavoriteBorderIcon /> Add to Wishlist
                        </IconButton>
                        <IconButton color="default" sx={{ marginLeft: '10px' }}>
                            <CompareArrowsIcon /> Compare
                        </IconButton> */}

                            </Box>

                            {/* Categories */}
                            <Box sx={{ marginTop: '20px' }}>
                                <Typography variant="body2" fontWeight="bold">
                                    Categories:
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {['Anniversary', 'Birthday', 'Christmas', 'Valentine Day'].map((category, index) => (
                                        <Chip key={index} label={category} sx={{ margin: '5px' }} />
                                    ))}
                                </Box>
                            </Box>

                            {/* Social Media Share Icons */}
                            <Box sx={{ display: 'flex', marginTop: '20px' }}>
                                <IconButton>
                                    <i className="fab fa-facebook-f"></i>
                                </IconButton>
                                <IconButton>
                                    <i className="fab fa-twitter"></i>
                                </IconButton>
                            </Box>
                        </Grid2>
                    </Grid2>
            }
        </Box>
    );
};

export default ProductDetail;
