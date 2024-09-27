import { Box, Button, Card, CardContent, CardMedia, Grid2, Typography } from '@mui/material'
import React from 'react'
import { GetProductByIdReadDto } from '../../../data/types/product'

const ProductCardMini = ({ product }: {product : GetProductByIdReadDto}) => {
    return (
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={'https://th.bing.com/th/id/OIP.Vtxy0FjT_EfudI4cQk1kzAHaE8?rs=1&pid=ImgDetMain'}
                    alt={product.title}
                />
                <CardContent sx={{ textAlign: 'center' }}>

                    {/* Product Name */}
                    <Typography variant="body1" sx={{ marginBottom: '8px' }}>
                        {product.title}
                    </Typography>

                    {/* Product Price */}
                    {/* {product.onSale ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" sx={{ textDecoration: 'line-through', color: '#888' }}>
                                ${product.originalPrice}
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f50057' }}>
                                ${product.price}
                            </Typography>
                        </Box>
                    ) : (
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            ${product.price}
                        </Typography>
                    )} */}

                    {/* Add to Cart Button */}
                    <Button variant="contained" color="primary" sx={{ marginTop: '8px' }}>
                        ADD TO CART
                    </Button>
                </CardContent>
            </Card>
        </Grid2>
    )
}

export default ProductCardMini