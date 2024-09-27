import React from 'react';
import { AppBar, Toolbar, Typography, Box, Container, Grid, Link, Button, TextField, IconButton } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: '#000', color: '#fff', mt: 4 }}>
      {/* Top Bar */}
      <AppBar position="static" sx={{ backgroundColor: '#f50057', color: '#fff', boxShadow: 'none', py: 1 }}>
        <Container>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocalShippingIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Free Shipping Worldwide</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <HeadsetMicIcon sx={{ mr: 1 }} />
              <Typography variant="body2">24x7 Customer Support</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AutorenewIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Returns and Exchange</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PhoneIcon sx={{ mr: 1 }} />
              <Typography variant="body2">Hotline: +(408) 394-7557</Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Footer Content */}
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Shopping Guide */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2 }}>Shopping Guide</Typography>
            {['Blog', 'FAQs', 'Payment', 'Shipment', 'Where is my order?', 'Return policy'].map((item) => (
              <Link href="#" underline="none" color="inherit" key={item} sx={{ display: 'block', mb: 1 }}>
                {item}
              </Link>
            ))}
          </Grid>

          {/* Style Advisor */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2 }}>Style Advisor</Typography>
            {['Your Account', 'Information', 'Addresses', 'Discount', 'Orders History', 'Order Tracking'].map((item) => (
              <Link href="#" underline="none" color="inherit" key={item} sx={{ display: 'block', mb: 1 }}>
                {item}
              </Link>
            ))}
          </Grid>

          {/* Information */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2 }}>Information</Typography>
            {['Site Map', 'Search Terms', 'Advanced Search', 'About Us', 'Contact Us', 'Suppliers'].map((item) => (
              <Link href="#" underline="none" color="inherit" key={item} sx={{ display: 'block', mb: 1 }}>
                {item}
              </Link>
            ))}
          </Grid>

          {/* Newsletter and Social */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2 }}>Sign Up For Emails:</Typography>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <TextField
                placeholder="Your email address"
                variant="outlined"
                size="small"
                fullWidth
                sx={{ bgcolor: '#fff', borderRadius: '4px' }}
              />
              <Button variant="contained" color="secondary" sx={{ ml: 1 }}>
                Subscribe
              </Button>
            </Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Follow Us</Typography>
            <Box>
              <IconButton color="inherit" href="#">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" href="#">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" href="#">
                <GoogleIcon />
              </IconButton>
              <IconButton color="inherit" href="#">
                <PinterestIcon />
              </IconButton>
              <IconButton color="inherit" href="#">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" href="#">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="inherit" href="#">
                <YouTubeIcon />
              </IconButton>
            </Box>
            <Box sx={{ mt: 2 }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/16/PayPal_logo.svg" alt="PayPal" width={50} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Visa_2014_logo_detail.svg" alt="Visa" width={50} style={{ marginLeft: 10 }} />
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Mastercard-logo.svg" alt="MasterCard" width={50} style={{ marginLeft: 10 }} />
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, borderTop: '1px solid grey', pt: 2 }}>
          <Typography variant="body2" color="textSecondary">
            © 2016 Magikcommerce. All Rights Reserved.
          </Typography>
          <Box>
            {['Magento Extensions', 'Responsive Themes', 'Premium Themes', 'Magento Themes'].map((item) => (
              <Link href="#" underline="none" color="inherit" key={item} sx={{ mx: 1 }}>
                {item}
              </Link>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Footer Final Bottom */}
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <Typography variant="body2" color="textSecondary">
          123 Main Street, Anytown, CA 12345 USA | +(408) 394-7557 | abc@magikcommerce.com
        </Typography>
      </Box>
    </Box>
  );
}
