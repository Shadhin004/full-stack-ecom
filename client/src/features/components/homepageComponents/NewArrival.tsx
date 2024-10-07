import React from 'react';
import { Box, Grid, Typography, Card, CardContent, CardMedia, Button, Tabs, Tab, Grid2 } from '@mui/material';
import ProductCardMini from '../product/ProductCardMini';

const products = [
  {
    "productId": "7d1dc92d-26df-4159-8dd0-b332f5ce988e",
    "title": "Birthday Surprise Tulips",
    "description": "Celebrate the season with nature's best.",
    "imageUrl": null,
    "minPrice": 35.99,
    "inventory": 20,
    "avgStar": 0,
    "variation": [
      {
        "variationId": "3ea91755-a071-45cc-81a2-b7aedce1d724",
        "variationName": "Large",
        "price": 35.99,
        "inventory": 10,
        "productId": "7d1dc92d-26df-4159-8dd0-b332f5ce988e"
      },
      {
        "variationId": "6ba577b6-f955-4bdd-a6eb-b83b69bbd53e",
        "variationName": "Large",
        "price": 35.99,
        "inventory": 10,
        "productId": "7d1dc92d-26df-4159-8dd0-b332f5ce988e"
      }
    ]
  },
  {
    "productId": "8d4655aa-b387-435d-9da8-cfc8d60b5df9",
    "title": "Birthday Surprise Tulips",
    "description": "An elegant floral arrangement.",
    "imageUrl": null,
    "minPrice": 15.99,
    "inventory": 35,
    "avgStar": 0,
    "variation": [
      {
        "variationId": "ecb1a6ca-12cb-4a7c-9d55-b748796e6f96",
        "variationName": "Small",
        "price": 15.99,
        "inventory": 20,
        "productId": "8d4655aa-b387-435d-9da8-cfc8d60b5df9"
      },
      {
        "variationId": "ed11d91e-d4a4-4837-91c8-c5582b435aa6",
        "variationName": "Medium",
        "price": 25.99,
        "inventory": 15,
        "productId": "8d4655aa-b387-435d-9da8-cfc8d60b5df9"
      }
    ]
  },
  {
    "productId": "eff26cc9-eaa3-4ad5-a578-0e740097f45b",
    "title": "Birthday Surprise Tulips",
    "description": "A beautiful collection of fresh flowers.",
    "imageUrl": null,
    "minPrice": 15.99,
    "inventory": 30,
    "avgStar": 0,
    "variation": [
      {
        "variationId": "7027cb92-761e-40a8-8034-110271080790",
        "variationName": "Small",
        "price": 15.99,
        "inventory": 20,
        "productId": "eff26cc9-eaa3-4ad5-a578-0e740097f45b"
      },
      {
        "variationId": "7dde41c1-b708-4b1e-9551-3873a3da7ff2",
        "variationName": "Large",
        "price": 35.99,
        "inventory": 10,
        "productId": "eff26cc9-eaa3-4ad5-a578-0e740097f45b"
      }
    ]
  },
  {
    "productId": "778f52e9-ee57-4c4f-950d-ed4c28007afc",
    "title": "Box of Emotions",
    "description": "Description",
    "imageUrl": null,
    "minPrice": 25.99,
    "inventory": 4,
    "avgStar": 4.5,
    "variation": [
      {
        "variationId": "e1da1a80-7418-49ed-bde9-311a5f95e582",
        "variationName": "Box of Emotions small",
        "price": 25.99,
        "inventory": 4,
        "productId": "778f52e9-ee57-4c4f-950d-ed4c28007afc"
      }
    ]
  },
  {
    "productId": "d780784c-49b3-4442-9adf-f5f8a970333b",
    "title": "Floral Rainbow",
    "description": "Description",
    "imageUrl": null,
    "minPrice": 55.99,
    "inventory": 5,
    "avgStar": 0,
    "variation": [
      {
        "variationId": "ff2374d6-5c8e-4f75-b65f-6a5bedec648e",
        "variationName": "Floral Rainbow normal",
        "price": 55.99,
        "inventory": 5,
        "productId": "d780784c-49b3-4442-9adf-f5f8a970333b"
      }
    ]
  },
];

const NewArrival = () => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event : any, newValue : any) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ padding: '40px 20px' }} className='container'>
      {/* Section Title */}
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '16px' }}>
        <Typography component="span" sx={{ color: '#f50057', fontWeight: 'bold' }}>
          NEW
        </Typography>{' '}
        PRODUCTS
      </Typography>

      {/* Tabs for Categories */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        sx={{ marginBottom: '32px', borderBottom: '1px solid #ddd' }}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="ANNIVERSARY" />
        <Tab label="EVERYDAY OCCASIONS" />
        <Tab label="OCCASION" />
        <Tab label="SPECIAL OCCASION" />
      </Tabs>

      {/* Products Grid */}
      <Grid2 container spacing={4}>
        {products.map((product, index) => (
          <ProductCardMini key={index} product={product} />
        ))}
      </Grid2>
    </Box>
  );
};

export default NewArrival;
