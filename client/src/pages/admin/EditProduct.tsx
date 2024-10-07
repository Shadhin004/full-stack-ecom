import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import {
    Grid,
    TextField,
    Button,
    IconButton,
    Box,
    Typography,
    Paper,
    Card,
    CardContent,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import DashboardLayout from '../../layout/DashboardLayout';
import { useGetCategoriesQuery, useGetProductDetailsQuery, useUpdateProductsMutation } from '../../data/redux/api';
import { useParams } from 'react-router-dom';
import GlobalLoader from '../../features/components/sharedComponents/GlobalLoader';
import { UpdateProducDto } from '../../data/types/product';
import { enqueueSnackbar } from 'notistack';
import { ALERT_SEVERITY } from '../../data/config';

// Define interfaces for the form structure
interface Image {
    imageId: string;
    imageUrl: string;
    productId: string;
}

interface Variation {
    variationId: string;
    variationName: string;
    price: number;
    inventory: number;
    productId: string;
}

interface ProductCategory {
    productCategoryId: string;
    categoryId: string;
    productId: string;
}

interface FormValues {
    title: string;
    description: string;
    images: Image[];
    variations: Variation[];
    productCategories: ProductCategory[];
}

const EditProductPage: React.FC = () => {
    // Sample product data (this could be fetched from an API)
    const { productId } = useParams()
    const { data: productDetails, isLoading: productLoading } = useGetProductDetailsQuery(productId)
    const { data: categoryOptions } = useGetCategoriesQuery(undefined)
    const [updateProduct] = useUpdateProductsMutation()
    const [productData, setProductData] = useState({
        productId: "",
        title: '',
        description: '',
        images: [
            {
                imageId: '',
                imageUrl: '',
                productId: '',
            },
        ],
        variations: [
            {
                variationId: '',
                variationName: '',
                price: 0,
                inventory: 0,
                productId: '',
            },
        ],
        productCategories: [
            {
                productCategoryId: '',
                categoryId: '',
                productId: '',
            },
        ],
    })

    console.log(productDetails)

    useEffect(() => {
        if (productDetails) {
            setProductData(productDetails);
        }
    }, [productDetails]);
    // Initialize useForm hook with default values
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UpdateProducDto>({
        values: productData,
    });

    // Reset the form when the data is loaded (e.g., after fetching from API)

    // useFieldArray for dynamic images, variations, and product categories
    const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
        control,
        name: 'images',
    });

    const { fields: variationFields, append: appendVariation, remove: removeVariation } = useFieldArray({
        control,
        name: 'variations',
    });

    const { fields: categoryFields, append: appendCategory, remove: removeCategory } = useFieldArray({
        control,
        name: 'productCategories',
    });

    // Form submit handler
    const onSubmit: SubmitHandler<UpdateProducDto> = async (data) => {
        console.log('Form Data: ', data);
        const response: any = await updateProduct(data)
        if (response?.error) {
            enqueueSnackbar(`Something went wrong!`, {
                variant: ALERT_SEVERITY.error,
            });
        } else {
            enqueueSnackbar(`Updated successfully!`, {
                variant: ALERT_SEVERITY.success,
            });
        }
    };

    return (
        <DashboardLayout>
            {
                productLoading ?
                    <GlobalLoader />
                    :
                    <Box p={4}>
                        {/* Page Header */}
                        <Typography variant="h4" gutterBottom>
                            Edit Product
                        </Typography>

                        {/* Form Start */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                {/* Title Field */}
                                <Grid item xs={12}>
                                    <TextField
                                        label="Title"
                                        fullWidth
                                        {...register('title', { required: 'Title is required' })}
                                        error={!!errors.title}
                                        helperText={errors.title?.message}
                                        variant='outlined'
                                        size='small'
                                    />
                                </Grid>

                                {/* Description Field */}
                                <Grid item xs={12}>
                                    <TextField
                                        label="Description"
                                        fullWidth
                                        multiline
                                        rows={4}
                                        {...register('description', { required: 'Description is required' })}
                                        error={!!errors.description}
                                        helperText={errors.description?.message}
                                        variant='outlined'
                                        size='small'
                                    />
                                </Grid>

                                {/* Images Section */}
                                <Grid item xs={12}>
                                    <Typography variant="h6">Images</Typography>
                                    {imageFields?.map((field, index) => (
                                        <Box key={field.id} mb={2}>
                                            <TextField
                                                label={`Image URL ${index + 1}`}
                                                fullWidth
                                                {...register(`images.${index}.imageUrl`, { required: 'Image URL is required' })}
                                                error={!!errors.images?.[index]?.imageUrl}
                                                helperText={errors.images?.[index]?.imageUrl?.message}
                                                variant='outlined'
                                                size='small'
                                            />
                                            <IconButton
                                                size='small' onClick={() => removeImage(index)} color="error">
                                                <Delete />
                                            </IconButton>
                                        </Box>
                                    ))}
                                    <Button
                                        variant="contained"
                                        startIcon={<Add />}
                                        onClick={() => appendImage({ imageId: '', imageUrl: '', productId: '' })}
                                        size='small'
                                    >
                                        Add Image
                                    </Button>
                                </Grid>

                                {/* Variations Section */}
                                <Grid item xs={12}>
                                    <Typography variant="h6">Variations</Typography>
                                    {variationFields?.map((field, index) => (
                                        <Paper key={field.id} elevation={3} sx={{ p: 2, mb: 2 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        label="Variation Name"
                                                        fullWidth
                                                        {...register(`variations.${index}.variationName`, { required: 'Variation name is required' })}
                                                        error={!!errors.variations?.[index]?.variationName}
                                                        helperText={errors.variations?.[index]?.variationName?.message}
                                                        variant='outlined'
                                                        size='small'
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        label="Price"
                                                        type="number"
                                                        fullWidth
                                                        {...register(`variations.${index}.price`, { required: 'Price is required' })}
                                                        error={!!errors.variations?.[index]?.price}
                                                        helperText={errors.variations?.[index]?.price?.message}
                                                        variant='outlined'
                                                        size='small'
                                                    />
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <TextField
                                                        label="Inventory"
                                                        type="number"
                                                        fullWidth
                                                        {...register(`variations.${index}.inventory`, { required: 'Inventory is required' })}
                                                        error={!!errors.variations?.[index]?.inventory}
                                                        helperText={errors.variations?.[index]?.inventory?.message}
                                                        variant='outlined'
                                                        size='small'
                                                    />
                                                </Grid>
                                            </Grid>
                                            <IconButton
                                                size='small' onClick={() => removeVariation(index)} color="error">
                                                <Delete />
                                            </IconButton>
                                        </Paper>
                                    ))}
                                    <Button
                                        variant="contained"
                                        startIcon={<Add />}
                                        onClick={() => appendVariation({ variationId: '', variationName: '', price: 0, inventory: 0, productId: '' })}
                                        size='small'
                                    >
                                        Add Variation
                                    </Button>
                                </Grid>

                                {/* Categories Section */}
                                <Grid item xs={12}>
                                    <Typography variant="h6">Product Categories</Typography>
                                    {categoryFields?.map((field, index) => {
                                        return (
                                            <Box key={field.id} mb={2}>
                                                <FormControl fullWidth>
                                                    <InputLabel>Category</InputLabel>
                                                    <Select
                                                        label="Category"
                                                        defaultValue={field.id}
                                                        {...register(`productCategories.${index}.categoryId`, { required: 'Category is required' })}
                                                        error={!!errors.productCategories?.[index]?.categoryId}
                                                        variant='outlined'
                                                        size='small'
                                                    >
                                                        {categoryOptions?.map((option: any) => (
                                                            <MenuItem key={option.categoryId} value={option.categoryId}>
                                                                {option.categoryName}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <IconButton
                                                    size='small' onClick={() => removeCategory(index)} color="error">
                                                    <Delete />
                                                </IconButton>
                                            </Box>
                                        )
                                    })}
                                    <Button
                                        variant="contained"
                                        startIcon={<Add />}
                                        onClick={() => appendCategory({ productCategoryId: '', categoryId: '', productId: '' })}
                                        size='small'
                                    >
                                        Add Category
                                    </Button>
                                </Grid>

                                {/* Submit Button */}
                                <Grid item xs={12}>
                                    <Button variant="contained" color="primary" type="submit" size='small' fullWidth>
                                        Save Changes
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
            }
        </DashboardLayout>
    );
};

export default EditProductPage;
