import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import theme from './data/theme/globalTheme';
import { ThemeProvider } from '@mui/material';
import { store } from './data/store';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <SnackbarProvider
            maxSnack={3}
            preventDuplicate={true}
            autoHideDuration={5000}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
        <App />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
