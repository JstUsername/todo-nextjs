'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    main: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#F1F1F1',
    },
    success: {
      main: '#47B091',
    },
    error: {
      main: '#E33939',
    },
  },
});

export default theme;
