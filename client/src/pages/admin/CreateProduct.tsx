import React from 'react';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Grid, IconButton, Box, MenuItem, Select } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import DashboardLayout from '../../layout/DashboardLayout';
import { useCreateProductsMutation, useGetCategoriesQuery } from '../../data/redux/api';
import { CreateProducDto } from '../../data/types/product';

// Define interfaces for form structure
interface Image {
    imageUrl: string;
}

interface Variation {
    variationName: string;
    price: number;
    inventory: number;
}

interface Category {
    categoryId: string;
}

interface FormValues {
    title: string;
    description: string;
    images: Image[];
    variations: Variation[];
    productCategories: Category[];
}

const CreateProduct: React.FC = () => {
    // Initialize useForm hook
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<CreateProducDto>({
        defaultValues: {
            title: '',
            description: '',
            images: [{ imageUrl: '' }],
            variations: [{ variationName: '', price: 0, inventory: 0 }],
            productCategories: [{ categoryId: '' }],
        },
    });

    const { data: productCategoryList, error } = useGetCategoriesQuery(undefined)
    const [createProduct] = useCreateProductsMutation() 

    // Manage dynamic fields for images, variations, and categories
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
    const onSubmit: SubmitHandler<CreateProducDto> = async (data) => {
        const response = await createProduct(data)
        console.log(response);
    };

    return (
        <DashboardLayout>
            <Box>
                <h1>Create Product</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Title */}
                    {/* <Grid item xs={12}> */}
                    <h3>Images</h3>
                    <TextField
                        label="Title"
                        fullWidth
                        {...register('title', { required: 'Title is required' })}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        variant='outlined'
                        size='small'
                    />
                    {/* </Grid> */}

                    {/* Description */}
                    {/* <Grid item xs={12}> */}
                    <h3>Images</h3>
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
                    {/* </Grid> */}

                    {/* Images */}
                    {/* <Grid item xs={12}> */}
                    <h3>Images</h3>
                    {imageFields.map((field, index) => (
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
                            <IconButton size='small' onClick={() => removeImage(index)} aria-label="delete">
                                <Delete />
                            </IconButton>
                        </Box>
                    ))}
                    <Button
                        startIcon={<Add />}
                        onClick={() => appendImage({ imageUrl: '' })}
                        variant='outlined'
                        size='small'
                    >
                        Add Image
                    </Button>
                    {/* </Grid> */}

                    {/* Variations */}
                    {/* <Grid item xs={12}> */}
                    <h3>Variations</h3>
                    {variationFields.map((field, index) => (
                        <Box key={field.id} mb={2}>
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
                                        {...register(`variations.${index}.price`, {
                                            required: 'Price is required',
                                            min: { value: 1, message: 'Price must be at least 1' },
                                        })}
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
                                        {...register(`variations.${index}.inventory`, {
                                            required: 'Inventory is required',
                                            min: { value: 0, message: 'Inventory cannot be negative' },
                                        })}
                                        error={!!errors.variations?.[index]?.inventory}
                                        helperText={errors.variations?.[index]?.inventory?.message}
                                        variant='outlined'
                                        size='small'
                                    />
                                </Grid>
                            </Grid>
                            <IconButton
                                size='small' onClick={() => removeVariation(index)} aria-label="delete">
                                <Delete />
                            </IconButton>
                        </Box>
                    ))}
                    <Button
                        startIcon={<Add />}
                        onClick={() => appendVariation({ variationName: '', price: 0, inventory: 0 })}
                        variant='outlined'
                        size='small'
                    >
                        Add Variation
                    </Button>
                    {/* // </Grid> */}

                    {/* Product Categories */}
                    {/* <Grid item xs={12}> */}
                    <h3>Product Categories</h3>
                    {categoryFields.map((field, index) => (
                        <Box key={field.id} mb={2}>
                            <Select
                                variant="outlined"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="City"
                                fullWidth
                                size="small"
                                // value={cities}
                                {...register(`productCategories.${index}.categoryId`, {
                                    required: {
                                        value: true,
                                        message: "Category Id is required!"
                                    },
                                    pattern: {
                                        value: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
                                        message: 'Invalid UUID format',
                                      },
                                })}
                            >
                                {
                                    productCategoryList?.map((item: any, index: number) => {
                                        return (
                                            <MenuItem key={index} value={item.categoryId}>{item.categoryName}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                            <IconButton size='small' onClick={() => removeCategory(index)} aria-label="delete">
                                <Delete />
                            </IconButton>
                        </Box>
                    ))}
                    <Button
                        startIcon={<Add />}
                        onClick={() => appendCategory({ categoryId: '' })}
                        variant='outlined'
                        size='small'
                    >
                        Add Category
                    </Button>
                    {/* // </Grid> */}

                    {/* Submit Button */}
                    {/* <Grid item xs={12}> */}
                    <Button variant="contained" type="submit" fullWidth>
                        Submit
                    </Button>
                    {/* // </Grid> */}
                </form>
            </Box>
        </DashboardLayout>
    );
};

export default CreateProduct;
