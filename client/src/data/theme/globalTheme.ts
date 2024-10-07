import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f50057', // The pink color from your headers and buttons
    },
    secondary: {
      main: '#000000', // Black for text
    },
    background: {
      default: '#ffffff', // Default background is white
      paper: '#f9f9f9', // Background for cards and sections
    },
    text: {
      primary: '#000000', // Black text for most elements
      secondary: '#555555', // Lighter gray for subtitles and other text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#f50057', // Pink for major headers
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#000', // Black for secondary headers
    },
    h3: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      color: '#000', // Used for card titles and product names
    },
    subtitle1: {
      fontSize: '1rem',
      color: '#555555', // Gray subtitle text
    },
    body1: {
      fontSize: '1rem',
      color: '#000000', // Main body text color
    },
    button: {
      textTransform: 'uppercase', // Buttons are uppercase
      fontWeight: 'bold',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          borderBottom: '2px solid #f50057',
          color: '#000000',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px', // Rounded buttons
          padding: '10px 20px',
        },
        outlined: {
          borderColor: '#f50057',
          color: '#f50057',
          '&:hover': {
            backgroundColor: '#f50057',
            color: '#ffffff',
          },
        },
        contained: {
          backgroundColor: '#f50057',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#c51162',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          padding: '20px',
          '&:hover': {
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          subtitle1: 'p',
          body1: 'p',
        },
      },
    },
  },
});

export default theme;
