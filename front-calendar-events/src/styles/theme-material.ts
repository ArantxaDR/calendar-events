import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3742',
    },
    secondary: {
      main: '#0080be',
    },
    error: {
      main: '#fd3e8c',
    },
    background: {
      default: 'f7ffff',
    },
  },
  typography: {
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export default theme;
