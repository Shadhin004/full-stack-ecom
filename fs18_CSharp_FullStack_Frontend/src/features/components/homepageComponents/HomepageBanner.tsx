import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Banner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '500px',
        backgroundImage: `url(https://th.bing.com/th/id/R.f8c8db5ce4f2faa0297bc44e06effc88?rik=BA6KO7zEFIkOtA&riu=http%3a%2f%2fhddesktopwallpapers.in%2fwp-content%2fuploads%2f2015%2f11%2fbeautiful-flower-nature.jpg&ehk=uJ73iB4c1RTrHVutfOPW2O4r21e%2f5Knod6kw3bGCd8k%3d&risl=&pid=ImgRaw&r=0)`, // Replace this with the actual image path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            letterSpacing: '4px',
            textTransform: 'uppercase',
            marginBottom: '16px',
            fontWeight: 'bold',
          }}
        >
          {/* Modern Design */}
        </Typography>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          {/* Season Sale */}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            marginBottom: '24px',
          }}
        >
          {/* In augue urna, nunc, tincidunt, augue, augue facilisis facilisis. */}
        </Typography>

        {/* <Button
          variant="outlined"
          sx={{
            color: '#fff',
            borderColor: '#fff',
            padding: '10px 20px',
            textTransform: 'uppercase',
            '&:hover': {
              backgroundColor: '#fff',
              color: '#000',
            },
          }}
        >
          Shop Now
        </Button> */}
      </Box>
    </Box>
  );
};

export default Banner;
